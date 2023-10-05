//ACTION TYPES
export const SET_ALL_REVIEWS = 'reviews/SET_ALL_REVIEWS'
export const SET_ITEM_REVIEWS = 'reviews/SET_ITEM_REVIEWS'
export const SET_USER_REVIEWS = 'reviews/SET_USER_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

//ACTION CREATORS
export const setAllReviews = (reviews) => ({
  type: SET_ALL_REVIEWS,
  payload: reviews,
});

export const setItemReviews = (reviews) => ({
  type: SET_ITEM_REVIEWS,
  payload: reviews,
});

export const setUserReviews = (reviews) => ({
  type: SET_USER_REVIEWS,
  payload: reviews,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});

//THUNKS
// Thunk to fetch all reviews
export const fetchAllReviewsThunk = () => async (dispatch) => {
  // make a GET request to your Flask API
  // to fetch all reviews and dispatch the 'setAllReviews' action.
};

// Thunk to fetch reviews for a specific item
export const fetchItemReviewsThunk = (itemId) => async (dispatch) => {
  // make a GET request to your Flask API
  // to fetch reviews for a specific item and dispatch the 'setItemReviews' action.
};

// Thunk to fetch reviews for a specific user
export const fetchUserReviewsThunk = (userId) => async (dispatch) => {
  // make a GET request to your Flask API
  // to fetch reviews for a specific user and dispatch the 'setUserReviews' action.
};

// Thunk to add a new review
export const addReviewThunk = (reviewData) => async (dispatch) => {
  // make a POST request to your Flask API
  // to add a new review and dispatch the 'addReview' action.
};

// Thunk to update an existing review
export const updateReviewThunk = (reviewData) => async (dispatch) => {
  // make a PUT request to your Flask API
  // to update an existing review and dispatch the 'updateReview' action.
};

// Thunk to delete a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  // make a DELETE request to your Flask API
  // to delete a review and dispatch the 'deleteReview' action.
};

//REDUCER
const initialState = {
  allReviews: [],
  itemReviews: [],
  userReviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_REVIEWS:
      // set all reviews
      return state;

    case SET_ITEM_REVIEWS:
      // set reviews for a specific item
      return state;

    case SET_USER_REVIEWS:
      // set reviews for a specific user
      return state;

    case ADD_REVIEW:
      // add a new review
      return state;

    case UPDATE_REVIEW:
      // update a review
      return state;

    case DELETE_REVIEW:
      // delete a review
      return state;

    default:
      return state;
  }
};

export default reviewsReducer;
