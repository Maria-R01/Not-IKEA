//ACTION TYPES
export const ADD_TO_CART = 'cart/ADD_TO_CART'
export const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM'
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART'
export const CLEAR_CART = 'cart/CLEAR_CART'


// ACTION CREATORS
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const updateCartItem = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { itemId, quantity },
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

//THUNKS
// Thunk to add an item to the cart
export const addToCartThunk = (item) => async (dispatch) => {
  // to make a POST request to your Flask API
  // to add the item to the shopping cart and dispatch the 'addToCart' action.
};

// Thunk to update the quantity of an item in the cart
export const updateCartItemThunk = (itemId, quantity) => async (dispatch) => {
    // to make a PUT request to your Flask API
    // to update the cart item's quantity and dispatch the 'updateCartItem' action.
};

// Thunk to remove an item from the cart
export const removeFromCartThunk = (itemId) => async (dispatch) => {
  // to make a DELETE request to your Flask API
  // to remove the item from the shopping cart and dispatch the 'removeFromCart' action.
};

// Thunk to clear the entire cart
export const clearCartThunk = () => async (dispatch) => {
  // to make a DELETE request to your Flask API
  // to clear the entire shopping cart and dispatch the 'clearCart' action.
};

//REDUCER
const initialState = {
  cartItems: [],
  cartTotal: 0,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // to add an item to the cart
      return state;

    case UPDATE_CART_ITEM:
      // to update the quantity of an item in the cart
      return state;

    case REMOVE_FROM_CART:
      // to remove an item from the cart
      return state;

    case CLEAR_CART:
      // to clear the entire cart
      return state;

    default:
      return state;
  }
};

export default shoppingCartReducer;
