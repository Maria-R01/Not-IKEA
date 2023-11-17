import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import shoppingCartReducer from './shoppingCart';
import reviewsReducer from './review';
import itemsReducer from './item'
import searchReducer from './search';
import wishlistReducer from './wishlist';


const rootReducer = combineReducers({
  session,
  items: itemsReducer,
  reviews: reviewsReducer,
  shoppingCart: shoppingCartReducer,
  search: searchReducer,
  wishlist: wishlistReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
