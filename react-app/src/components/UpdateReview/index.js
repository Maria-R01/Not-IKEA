import './UpdateReview.css';
import AddReview from '../AddReview';

function UpdateReview({reviewToEdit, user_id, item_id}){
	return (
		<>
            <AddReview reviewToEdit={reviewToEdit} user_id={user_id} item_id={item_id}/>
        </>
		
	);
}

export default UpdateReview;