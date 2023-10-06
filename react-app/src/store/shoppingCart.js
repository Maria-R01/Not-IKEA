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
export const addToCartThunk = (item, quantity) => async (dispatch) => {
  // to make a POST request to your Flask API
  // to add the item to the shopping cart and dispatch the 'addToCart' action.
  const itemToAdd = { item, quantity }
  const response = await fetch(`/api/shopping_carts/add/${item.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemToAdd),
  });
  if (response.ok) {
    dispatch(addToCart(itemToAdd));
  } else {
    console.error('Error adding item to cart:', response.statusText);
  }
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
      // Check if the item is already in the cart
      const { item, quantity } = action.payload
      const existingCartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingCartItem !== -1) {
        // If the item is already in the cart, update its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex].quantity += quantity;

        // Calculate the new cart total
        const updatedCartTotal = updatedCartItems.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
          0
        );

        return {
          ...state,
          cartItems: updatedCartItems,
          cartTotal: updatedCartTotal,
        };
      } else {
        // If the item is not in the cart, add it
        const newCartItem = {
          item,
          quantity,
        };

        // Calculate the new cart total
        const updatedCartTotal =
          state.cartTotal + item.price * quantity;

        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
          cartTotal: updatedCartTotal,
        };
      }

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
