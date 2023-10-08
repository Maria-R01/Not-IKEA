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
                </div>
            </NavLink>
        </>
    )

}

export default ItemTile;