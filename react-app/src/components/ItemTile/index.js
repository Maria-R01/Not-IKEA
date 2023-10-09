import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './ItemTile.css';


const ItemTile = ({ item }) => {
    console.log('item in itemTile: ', item) //need to add avg rating and rating count
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
            <button>
                <img className='cart-icon' src='https://cdn3.iconfinder.com/data/icons/font-awesome-solid/576/cart-plus-512.png'></img>
            </button>
        </>
    )

}

export default ItemTile;