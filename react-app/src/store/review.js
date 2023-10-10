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
  const response = await fetch("/api/item_reviews/all_reviews");
  if (response.ok) {
    const data = await response.json();
    dispatch(setAllReviews(data.allReviews));
  } else {
    console.error("Error fetching all reviews.");
  }
};

// Thunk to fetch reviews for a specific item
export const fetchItemReviewsThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/item_reviews/item/${itemId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setItemReviews(data.itemReviews));
  } else {
    console.error(`Error fetching reviews for item ${itemId}.`);
  }
};

// Thunk to fetch reviews for a specific user
export const fetchUserReviewsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/item_reviews/user/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setUserReviews(data.userReviews));
  } else {
    console.error(`Error fetching reviews for user ${userId}.`);
  }
};

// Thunk to add a new review
export const addReviewThunk = (review) => async (dispatch) => {
  // console.log('REVIEW IN THUNK FOR ADDING REVIEW: ', review)
  const response = await fetch("/api/item_reviews/new_review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const { review: addedReview } = await response.json(); 
    dispatch(addReview(addedReview));
  } else {
    console.error("Error adding a new review.");
  }
};

// Thunk to update an existing review
export const updateReviewThunk = (reviewData) => async (dispatch) => {
  // console.log('DATA BEING PASSED INTO UPDATE REVIEW THUNK: ',reviewData)
  const response = await fetch(`/api/item_reviews/${reviewData.id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const { review: updatedReview } = await response.json();
    // console.log("UPDATE REVIEW RESPONSE: ", updateReview)
    dispatch(updateReview(updatedReview));
  } else {
    console.error(`Error updating review ${reviewData.id}.`);
  }
};

// Thunk to delete a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  // console.log('REVIEW ID BEING PASSED INTO DELETE REVIEW THUNK: ', typeof reviewId, reviewId)
  const response = await fetch(`/api/item_reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    console.error(`Error deleting review ${reviewId}.`);
  }
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
      return {
        ...state,
        allReviews: action.payload,
      };

    case SET_ITEM_REVIEWS:
      return {
        ...state,
        itemReviews: action.payload,
      };

    case SET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload,
      };

    case ADD_REVIEW:
      return {
        ...state,
        allReviews: [...state.allReviews, action.payload],
        userReviews: [...state.userReviews, action.payload],
        itemReviews: [...state.itemReviews, action.payload],
      };

    case UPDATE_REVIEW:
      const updatedReview = action.payload;
      const updatedAllReviews = state.allReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );
      const updatedUserReviews = state.userReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );
      const updatedItemReviews = state.itemReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );

      return {
        ...state,
        allReviews: updatedAllReviews,
        userReviews: updatedUserReviews,
        itemReviews: updatedItemReviews,
      };

    case DELETE_REVIEW:
      const deletedReviewId = action.payload;
      const filteredAllReviews = state.allReviews.filter(
        (review) => review.id !== deletedReviewId
      );
      const filteredUserReviews = state.userReviews.filter(
        (review) => review.id !== deletedReviewId
      );
      const filteredItemReviews = state.itemReviews.filter(
        (review) => review.id !== deletedReviewId
      );

      return {
        ...state,
        allReviews: filteredAllReviews,
        userReviews: filteredUserReviews,
        itemReviews: filteredItemReviews,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
