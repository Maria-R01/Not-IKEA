import './IndividualItems.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allItemsThunk } from '../../store/item'
import { addToCartThunk } from '../../store/shoppingCart'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AddReview from "../AddReview"
import UpdateReview from "../UpdateReview"
import DeleteReview from "../DeleteReview"
import OpenModalButton from '../OpenModalButton';
import { fetchAllReviewsThunk } from '../../store/review';


const IndividualItems = () => {
    const {itemId} = useParams()
    const itemIdNum = Number(itemId)
    const dispatch = useDispatch();
    const itemData = useSelector(state => state.items.allItems)
    const user = useSelector(state => state.session.user)
    const item = itemData && itemData?.find(item => item.id === itemIdNum)
    console.log('individual item: ', item)
    const itemImagesArr = item && item.images
    // console.log("item images: ", itemImagesArr)
    const itemsReviewsArr = item && item.reviews.sort(
        (a, b) => {
            const aTime = Date.parse(a.updatedAt);
            const bTime = Date.parse(b.updatedAt);
            return bTime - aTime
        }
      );
    console.log('item reviews: ', itemsReviewsArr)

    const userReviewIndex = () => {
        const reviewIndex = itemsReviewsArr &&  itemsReviewsArr?.findIndex(review => review.user_id === user.id)
        return reviewIndex
    }
    // console.log('userReviewIndex : ', userReviewIndex())
    const userReview = (index) => {
        if(index === -1) return {}
        return itemsReviewsArr && itemsReviewsArr[index]
    }
    const userHasReview = userReviewIndex() !== -1;
    console.log('userReview: ', userReview(userReviewIndex()))
    const formattedDate = (timeStamp) => {
        return new Date(timeStamp).toLocaleString("en-US", {
          month: "long",
          day: '2-digit',
          year: "numeric",
        });
    };
    
    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(addToCartThunk(item, 1));
    };

    useEffect(() => {
        dispatch(allItemsThunk())
        dispatch(fetchAllReviewsThunk())
    }, [dispatch])

    
    return (
        <>
            <div className='images-and-name-container'>
                <div className='images-container'>
                    {itemImagesArr?.map(image => (
                        <img className="item-image" src={image.url}></img>
                    ))}
                </div>
                <div className='name-price-avgRating'>
                        <div className='item-name'>
                            {item?.name}
                        </div>
                        <div className='item-price'>
                            ${item?.price}
                        </div>
                        <div className='avgRating-stars'>
                            Average Rating: {item?.average_rating}
                        </div>
                        <div className='amount-reviews'>
                            ({item?.review_count})
                        </div>
                </div>
                <div className='add-to-cart-button-container'>
                    <button className='add-cart-button' onClick={handleAddToCart}>
                        <i className="fa-solid fa-cart-plus fa-lg"></i>
                    </button>
                </div>
                <div className='description-container'>
                        <div className='description'>
                            Item Description: {item?.description}
                        </div>
                </div>
            </div>
            <div className='all-reviews-container'>
                <div>Reviews:</div>
                <div className='review-container'>
                    {!userHasReview && (
                        <OpenModalButton buttonText={`Add Review`} modalComponent={<AddReview userReview={userReview(userReviewIndex())} user_id={user.id} item_id={itemIdNum}/>} />
                    )}
                    {itemsReviewsArr?.map(review => (
                        <>  
                            <div className='review-date' key={review.id}>
                                Review Date: {formattedDate(review?.updated_at)}
                            </div>
                            <div className='review-content'>
                                {review?.review}
                            </div>
                            <div>
                                Stars Given: {review?.stars}
                            </div>
                            {review.user_id === user.id && (
                                <div>
                                    <OpenModalButton buttonText={`Update Review`} modalComponent={<UpdateReview  reviewToEdit={review} item_id={itemIdNum} user_id={user.id}/>} />
                                    <OpenModalButton buttonText={`Delete Review`} modalComponent={<DeleteReview  reviewId={review.id}/>} />
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </>
    )

}

export default IndividualItems;