import './DeleteReview.css';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/review';

function DeleteReview({reviewId}){
	const { closeModal } = useModal();
    const dispatch = useDispatch();

	const handleDeleteReview = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId));
		return (closeModal())
    };

	return (
		<div className="deleteReviewContainer">
            <div className="ConfirmDeleteHeading">
                <h2>Confirm Delete</h2>
            </div>
            <div className="deleteReviewQuestionContainer">
                <div>
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