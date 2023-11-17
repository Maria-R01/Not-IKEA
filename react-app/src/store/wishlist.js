// action types
export const ADD_TO_WISHLIST = "wishlist/ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "wishlist/REMOVE_FROM_WISHLIST";
export const SET_WISHLIST = "wishlist/SET_WISHLIST";

// action creators
export const addToWishlist = (itemId) => ({
    type: ADD_TO_WISHLIST,
    payload: itemId,
  });
  
  export const removeFromWishlist = (itemId) => ({
    type: REMOVE_FROM_WISHLIST,
    payload: itemId,
  });
  
  export const setWishlist = (wishlist) => ({
    type: SET_WISHLIST,
    payload: wishlist,
  });
  

// thunks.js

  // Wishlist thunks
  export const addToWishlistThunk = (itemId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/wishlist/add/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        dispatch(addToWishlist(itemId));
      } else if (response.status === 401) {
        // Handle unauthorized access
      } else {
        // Handle other errors
      }
    } catch (error) {
      // Handle network or other errors
    }
  };
  
  export const removeFromWishlistThunk = (itemId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/wishlist/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        dispatch(removeFromWishlist(itemId));
      } else if (response.status === 401) {
        // Handle unauthorized access
      } else {
        // Handle other errors
      }
    } catch (error) {
      // Handle network or other errors
    }
  };
  
  export const fetchWishlistThunk = () => async (dispatch) => {
    try {
      const response = await fetch("/api/wishlist/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(setWishlist(data.wishlist));
      } else if (response.status === 401) {
        // Handle unauthorized access
      } else {
        // Handle other errors
      }
    } catch (error) {
      // Handle network or other errors
    }
  };
  

// reducer.js
  const initialState = {
    wishlist: [],
  };
  
  const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST:
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case REMOVE_FROM_WISHLIST:
        return { ...state, wishlist: state.wishlist.filter(item => item !== action.payload) };
      case SET_WISHLIST:
        return { ...state, wishlist: action.payload };
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  