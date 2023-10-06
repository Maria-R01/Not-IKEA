//ACTION TYPES
export const GET_ALL_ITEMS = 'items/GET_ALL_ITEMS';

//ACTION CREATORS
export const getAllItems = (items) => ({
    type: GET_ALL_ITEMS,
    payload: items,
  });

//THUNKS
// Thunk to fetch all items with their images and reviews
export const allItemsThunk = () => async (dispatch) => {
    const response = await fetch('/api/items/'); 
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllItems(data.Items));
    } else {
      console.error('Failed to fetch items');
    }
  };

//REDUCER
const initialState = {
  allItems: [],
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        allItems: action.payload,
      };

    default:
      return state;
  }
};

export default itemsReducer;
