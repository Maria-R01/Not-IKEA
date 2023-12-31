import './AddReview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { addReviewThunk, updateReviewThunk } from '../../store/review';
import StarRating from '../StarRating'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function AddReview({user_id, item_id, reviewToEdit, setReRenderParent, reRenderParent}){
	// console.log('user_id, item_id in add item: ', user_id, item_id)
	// console.log('EDITING REVIEW: ', reviewToEdit)
	const history = useHistory()
	const allReviews = useSelector((state) => state.reviews.allReviews);
	const dispatch = useDispatch()
	const { closeModal } = useModal()
	const isThisAnEdit = reviewToEdit && Object.keys(reviewToEdit).length > 0
	const [stars, setStars] = useState(isThisAnEdit ? reviewToEdit.stars : 0)
	const [review, setReview] = useState(isThisAnEdit ? reviewToEdit.review : "")
	const [errors, setErrors] = useState({})

	const validationForReview = () => {
		const validationErrors = {}
		if(stars < 1 || stars > 5) validationErrors.stars = "Stars must be between 1 and 5";
		if(review.length < 10) validationErrors.review = "review must be at least 30 characters";
		return validationErrors;
	}

	const newReview = {
		user_id,
		item_id,
		review,
		stars,
	}

	const isDisabled = () => {
        const validationErrors = validationForReview();
        return (Object.values(validationErrors).length) ? true : false 
    }
	
	const starInputClick = (starsClicked) => {
        setStars(starsClicked)
    };


    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({})
        const validationErrors = validationForReview();
        if(Object.values(validationErrors).length) setErrors(validationErrors);
        if(!isThisAnEdit) {
            await dispatch(addReviewThunk(newReview))
        } else {
            newReview.id = reviewToEdit.id
            await dispatch(updateReviewThunk(newReview))
        }
        // history.push(`/item/${item_id}`)
        setReRenderParent(!reRenderParent)
        return (closeModal())
    };

	const submitButton = "review-submit-button" + (isDisabled() ? ' disabled' : '')
	return (
		<div className="review-modal">
            <div>
                <h2>Product Review</h2>
            </div>
            <div className='review-input-container'>
                <div className='review-required-container'>
                <label className='review-required'>Review: 
                    <span className='astrek'> *</span>
                </label>
                </div>
                <textarea 
                required
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Leave your review here (at least 10 characters)..."
                className="review-textarea"
                rows='6'
                cols='40'
                /> 
                <div className="char-count">
                    {review.length} / 10 characters
                </div>
            </div>
            <div className="stars-input-container">
            <div>
            Stars: <span className='astrek'>*</span>
            </div>
                <StarRating starsRating={stars} starInputClick={starInputClick} className="starRating-input"/>
            </div>
            <div className='submit-review-button'>
                <button className={submitButton} onClick={handleSubmit} disabled={isDisabled()} >Submit Your Review</button>
            </div>
        </div>
		
	);
}

export default AddReview;