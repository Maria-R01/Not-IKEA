import "./IndividualItems.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allItemsThunk, fetchItemByIdThunk } from "../../store/item";
import { addToCartThunk } from "../../store/shoppingCart";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AddReview from "../AddReview";
import UpdateReview from "../UpdateReview";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";
import { fetchAllReviewsThunk, fetchItemReviewsThunk, fetchUserReviewsThunk } from "../../store/review";

const IndividualItems = () => {
  const { itemId } = useParams();
  const itemIdNum = Number(itemId);
  const dispatch = useDispatch();
  const itemData = useSelector((state) => state.items.allItems);
  const user = useSelector((state) => state.session.user);
  const allReviewForItem = useSelector((state) => state.reviews.itemReviews)
  const allReviewsForUser = useSelector(state => state.reviews.userReviews)
  const itemSelector = useSelector(state => state.items.item.reviews)
  const [addedToCart, setAddedToCart] = useState(false);
  const loggedIn = user !== null;
  // console.log("LOGGEDIN: ", loggedIn);
  const item = itemData && itemData?.find((item) => item.id === itemIdNum);
  // console.log("individual item: ", item);
  const itemImagesArr = item && item.images;
  // console.log("item images: ", itemImagesArr)
  const itemsReviewsArr =
    item &&
    item.reviews.sort((a, b) => {
      const aTime = Date.parse(a.updated_at);
      const bTime = Date.parse(b.updated_at);
      return bTime - aTime;
    });
  // console.log("item reviews: ", itemsReviewsArr);

  const formattedPrice = item?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const userReviewIndex = () => {
    const reviewIndex =
      itemsReviewsArr &&
      itemsReviewsArr?.findIndex((review) => review.user_id === user?.id);
    return reviewIndex;
  };
  // console.log('userReviewIndex : ', userReviewIndex())
  const userReview = (index) => {
    if (index === -1) return {};
    return itemsReviewsArr && itemsReviewsArr[index];
  };
  const userHasReview = userReviewIndex() !== -1;
  // console.log("userReview: ", userReview(userReviewIndex()));
  const formattedDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCartThunk(item, 1));
    setAddedToCart(true);
    setTimeout(() => {
        setAddedToCart(false);
    }, 1000);
  };

  const [reRenderParent, setReRenderParent]= useState(false)
  useEffect(() => {
    dispatch(allItemsThunk());
    dispatch(fetchAllReviewsThunk());
    dispatch(fetchUserReviewsThunk(user?.id))
    dispatch(fetchItemByIdThunk(itemIdNum))
    }, [dispatch, reRenderParent]);

  return (
    <div className="individual-item-container">
      <div className="images-and-name-container">
        <div className="images-container">
          {itemImagesArr?.map((image) => (
            <img className="item-image" src={image.url} key={image.id}></img>
          ))}
        </div>
        <div className="description-container">
          <div className="description">
            {item?.description}
          </div>
        </div>
      </div>
      <div className="right-side-container">
        <div className="name-price-avgRating">
          <div className="item-name">{item?.item_name}</div>
          <div className="item-price">${item?.price.toFixed(2)}</div>
          <div className="stars-reviews-container">
            <div className="avgRating-stars">
                ★ {item?.average_rating.toFixed(1)}
            </div>
            <div className="amount-reviews">({item?.review_count})</div>
          </div>
        </div>
        {loggedIn && (
          <div className="add-to-cart-button-container">
            <button className="add-cart-button" onClick={handleAddToCart}>
              {addedToCart ? (
                  <i className="fa-solid fa-check-circle fa-lg"></i>
              ) : (
                  <i className="fa-solid fa-cart-plus fa-lg"></i>
              )}
            </button>
          </div>
        )}
        <div className="all-reviews-container">
          <div>Reviews:</div>
          <div className="review-container">
            {!userHasReview && loggedIn && (
              <OpenModalButton
                buttonText={`Add Review`}
                modalComponent={
                  <AddReview
                    userReview={userReview(userReviewIndex())}
                    user_id={user?.id}
                    item_id={itemIdNum}
                    setReRenderParent={setReRenderParent}
                    reRenderParent={reRenderParent}
                  />
                }
              />
            )}
            {itemsReviewsArr?.map((review) => (
              <div className="individual-review">
                <div className="date-stars">
                <div className="review-date" key={review.id}>
                  {formattedDate(review?.updated_at)}
                </div>
                <div className="stars">★ {review?.stars.toFixed(1)}</div>
                </div>
                <div className="review-content">{review?.review}</div>
                {review.user_id === user?.id && (
                  <div className="modal-buttons">
                    <OpenModalButton
                      buttonText={`Update Review`} 
                      className='update-modal-button'
                      modalComponent={
                        <UpdateReview
                          reviewToEdit={review}
                          item_id={itemIdNum}
                          user_id={user?.id}
                          setReRenderParent={setReRenderParent}
                          reRenderParent={reRenderParent}
                        />
                      }
                    />
                    <OpenModalButton
                      buttonText={`Delete Review`}
                      modalComponent={<DeleteReview reviewId={review.id} 	setReRenderParent={setReRenderParent} reRenderParent={reRenderParent}/>}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualItems;
