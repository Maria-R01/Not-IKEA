import './UpdateReview.css';
import AddReview from '../AddReview';
import { useSelector } from 'react-redux';

function UpdateReview({reviewToEdit, user_id, item_id}){
	const allReviews = useSelector((state) => state.reviews.allReviews);

	return (
		<>
            <AddReview reviewToEdit={reviewToEdit} user_id={user_id} item_id={item_id}/>
        </>
		
	);
}

export default UpdateReview;