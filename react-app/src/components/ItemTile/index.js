import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './ItemTile.css';
import { useDispatch } from 'react-redux';
import { addToCartThunk } from '../../store/shoppingCart'


const ItemTile = ({ item }) => {
    console.log('item in itemTile: ', item) //need to add avg rating and rating count
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(addToCartThunk(item, 1));
    };
    return (
        <>
            <NavLink to={`/item/${item.id}`}>
                <div key={item.id}>
                            <div>
                                Name: {item.item_name}
                            </div>
                            <div className='itemTile-image-container'>
                                <img src={item.images[0].url}></img>
                            </div>
                            <div>
                                Price: ${item.price}
                            </div>
                            <div>
                                Average Rating: {item.average_rating} ({item.review_count})
                            </div>
                </div>
            </NavLink>
            <button onClick={handleAddToCart}>
                <i className="fa-solid fa-cart-plus fa-lg"></i>
            </button>
        </>
    )

}

export default ItemTile;