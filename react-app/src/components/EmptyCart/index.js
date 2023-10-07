import './EmptyCart.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const EmptyCart = () => {

    return (
        <>
            <h2>Your shopping bag is empty</h2>
            <Link to='/home'>Click here to go explore all our products and add items to your shopping bag</Link>
        </>
    )

}

export default EmptyCart;