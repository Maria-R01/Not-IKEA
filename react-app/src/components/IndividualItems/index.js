import './IndividualItems.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allItemsThunk } from '../../store/item'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const IndividualItems = () => {
    const {itemId} = useParams()
    const itemIdNum = Number(itemId)
    const dispatch = useDispatch();
    const itemData = useSelector(state => state.items.allItems)
    const item = itemData && itemData?.find(item => item.id === itemIdNum)
    console.log('individual item: ', item)
    const itemImagesArr = item && item.images
    console.log("item images: ", itemImagesArr)
    const itemsReviewsArr = item && item.reviews.sort(
        (a, b) => {
            const aTime = Date.parse(a.updatedAt);
            const bTime = Date.parse(b.updatedAt);
            return bTime - aTime
        }
      );
    console.log('item reviews: ', itemsReviewsArr)

    const formattedDate = (timeStamp) => {
        return new Date(timeStamp).toLocaleString("en-US", {
          month: "long",
          day: '2-digit',
          year: "numeric",
        });
    };


    useEffect(() => {
        dispatch(allItemsThunk())
    }, [dispatch])

    
    return (
        <>
            <div className='images-and-name-container'>
                <div className='images-container'>
                    {itemImagesArr.map(image => (
                        <img className="item-image" src={image.url}></img>
                    ))}
                </div>
                <div className='name-price-avgRating'>
                        <div className='item-name'>
                            {item.name}
                        </div>
                        <div className='item-price'>
                            ${item.price}
                        </div>
                        <div className='avgRating-stars'>
                            Average Rating: {item.average_rating}
                        </div>
                        <div className='amount-reviews'>
                            ({item.review_count})
                        </div>
                </div>
                <div className='add-to-cart-button-container'>
                    <button className='add-cart-button'>Add to cart</button>
                </div>
                <div className='description-container'>
                        <div className='description'>
                            Item Description: {item.description}
                        </div>
                </div>
            </div>
            <div className='all-reviews-container'>
                <div>Reviews:</div>
                <div className='review-container'>
                    {itemsReviewsArr.map(review => (
                        <>  
                            <div className='review-date'>
                                Review Date: {formattedDate(review.updated_at)}
                            </div>
                            <div className='review-content'>
                                {review.review}
                            </div>
                            <div>
                                Stars Given: {review.stars}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )

}

export default IndividualItems;