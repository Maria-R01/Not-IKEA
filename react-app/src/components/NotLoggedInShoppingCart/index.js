import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './NotLoggedinShoppingCart.css';

const NotLoggedInShoppingCart = () => {
    
    return (
        <>
        <div>
            <div>Please
                <Link to='/login'> log in </Link>
                or
                <Link to='/signup'> sign up </Link>
                 to view/add items into your shopping bag.</div>
        </div>
        </>
    )

}

export default NotLoggedInShoppingCart;