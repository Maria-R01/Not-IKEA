export const SEARCH_ITEMS = 'SEARCH_ITEMS';

export const searchItems = (items) => ({
    type: SEARCH_ITEMS,
    payload: items
})


export const searchItemsThunk = (searchInput) => async dispatch => {
    // console.log('INSIDE THE THUNK')
    try {
        const response = await fetch(`/api/search-results/${searchInput}`);
        // console.log('RESPONSE FROM FETCH FOR SEARCH: ', response)
        const data = await response.json();
        dispatch(searchItems(data.items));
    } catch (error) {
        console.error(error);
    }
};

// reducer

const initialState = {
    items: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ITEMS:
            return {
                ...state,
                items: [...action.payload]
            };
        default:
            return state;
    }
};

export default searchReducer;