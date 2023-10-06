//ACTION TYPES
export const ADD_TO_CART = 'cart/ADD_TO_CART'
export const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM'
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART'
export const CLEAR_CART = 'cart/CLEAR_CART'


// ACTION CREATORS
export const addToCart = (itemToAdd) => ({
  type: ADD_TO_CART,
  payload: itemToAdd,
});

export const updateCartItem = (updatedCartItemQuantity) => ({
  type: UPDATE_CART_ITEM,
  payload: updatedCartItemQuantity,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

//THUNKS
// Thunk to add an item to the cart
export const addToCartThunk = (item, quantity) => async (dispatch) => {
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
export const updateCartItemThunk = (item, newQuantity) => async (dispatch) => {
    const updatedCartItemQuantity = {
      updatedItem: item,
      updatedQuantity: newQuantity,
    };
    const response = await fetch(`/api/shopping_carts/update/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCartItemQuantity)
    });
    if (response.ok) {
      dispatch(updateCartItem(updatedCartItemQuantity));
    } else {
      console.error("Failed to update cart item quantity:", response.statusText);
    }
};

// Thunk to remove an item from the cart
export const removeFromCartThunk = (item) => async (dispatch) => {
  const response = await fetch(`/api/shopping_carts/remove/${item.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item)
  });

  if (response.ok) {
    dispatch(removeFromCart(item));
  } else {
    console.error("Failed to remove item from cart:", response.statusText);
  }
};

// Thunk to clear the entire cart
export const clearCartThunk = () => async (dispatch) => {
  const response = await fetch("/api/shopping_carts/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(clearCart());
  } else {
    console.error("Failed to clear cart:", response.statusText);
  }
};

//REDUCER
const initialState = {
  cartItems: [],
  cartTotal: 0,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { item, quantity } = action.payload
      // Check if the item is already in the cart
      const existingCartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingCartItemIndex !== -1) {
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
      const { updatedItem, updatedQuantity } = action.payload;
      const updatedCartItems = state.cartItems.map((cartItem) => {
        if (cartItem.item.id === updatedItem.id) {
          // Update the quantity of the specified item
          return {
            item: updatedItem,
            quantity: updatedQuantity,
          };
        }
        return cartItem;
      });
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

    case REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (cartItem) => cartItem.item.id !== action.payload.item.id
      );
      // Calculate the new cart total
      const updatedTotal = filteredCartItems.reduce(
        (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
        0
      );
      return {
        ...state,
        cartItems: filteredCartItems,
        cartTotal: updatedTotal,
      };

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

export default shoppingCartReducer;
