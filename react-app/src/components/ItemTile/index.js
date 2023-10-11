import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './ItemTile.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartThunk } from '../../store/shoppingCart'


const ItemTile = ({ item }) => {
    // console.log('item in itemTile: ', item) //need to add avg rating and rating count
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const loggedIn = user !== null

    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(addToCartThunk(item, 1));
    };

    const formattedPrice = item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className='item-tile'>
            <NavLink to={`/item/${item.id}`}>
                <div key={item.id}>
                            <div className='itemTile-image-container'>
                                <img src={item.images[0].url}></img>
                            </div>
                            <div className='top-half-container'>
                                <div className='item-name'>
                                    {item.item_name}
                                </div>
                                {loggedIn && (
                                    <div className='add-cart-button'>
                                        <button onClick={handleAddToCart}>
                                            <i className="fa-solid fa-cart-plus fa-lg"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='price-rating-container'>
                                <div className='item-price'>
                                    ${item.price.toFixed(2)}
                                </div>
                                <div className='ratings'>
                                    ★ {item.average_rating.toFixed(1)} ({item.review_count})
                                </div>
                            </div>
                </div>
            </NavLink>
        </div>
    )

}

export default ItemTile;