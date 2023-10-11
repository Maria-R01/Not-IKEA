import './EmptyCart.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const EmptyCart = () => {

    return (
        <div className='empty-cart'>
            <h2>Your shopping bag is empty</h2>
            {/* <Link to='/home'>Click here to go explore all our products and begin adding items to your shopping bag</Link> */}
        </div>
    )

}

export default EmptyCart;