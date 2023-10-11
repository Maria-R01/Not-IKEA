//ACTION TYPES
export const GET_ALL_ITEMS = 'items/GET_ALL_ITEMS';
export const GET_ITEM_BY_ID = 'items/GET_ITEM_BY_ID';

//ACTION CREATORS
export const getAllItems = (items) => ({
    type: GET_ALL_ITEMS,
    payload: items,
  });

export const getItemById = (item) => ({
  type: GET_ITEM_BY_ID,
  item
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

  export const fetchItemByIdThunk = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`);
  
    if (response.ok) {
      const data = await response.json();
      dispatch(getItemById(data));
    } else {
      console.error('Failed to fetch item');
    }
  };

//REDUCER
const initialState = {
  allItems: [],
  item: {}
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        allItems: action.payload,
      };
    
    case GET_ITEM_BY_ID:
      return {
        ...state,
        item: action.item,
    };

    default:
      return state;
  }
};

export default itemsReducer;
