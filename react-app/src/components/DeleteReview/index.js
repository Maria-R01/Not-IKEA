import './DeleteReview.css';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/review';

function DeleteReview({reviewId, setReRenderParent, reRenderParent}){
	const { closeModal } = useModal();
    const dispatch = useDispatch();
	const allReviews = useSelector((state) => state.reviews.allReviews);

	const handleDeleteReview = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId));
        setReRenderParent(!reRenderParent)
		return (closeModal())
    };

	return (
		<div className="deleteReviewContainer">
            <div className="ConfirmDeleteHeading">
                <h2>Confirm Delete</h2>
            </div>
            <div className="deleteReviewQuestionContainer">
                <div className='deleteReviewQuestion'>
                    Are you sure you want to delete this review? 
                </div>
            </div>
            <div className="deleteReviewButtonsContainer">
                <button className="yes" onClick={handleDeleteReview}>Yes (Delete Review)</button>
                <button className="no" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
		
	);
}

export default DeleteReview;