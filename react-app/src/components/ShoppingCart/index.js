import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllShoppingCartsThunk, loadCartItemsThunk } from '../../store/shoppingCart';
import { allItemsThunk } from '../../store/item';
import NotLoggedInShoppingCart from '../NotLoggedInShoppingCart';
import LoggedInShoppingCart from '../LoggedInShoppingCart';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const items = useSelector(state => state.items.allItems)
    // console.log(items)
    const carts = useSelector(state => state.shoppingCart.allShoppingCarts)
    // console.log(carts)
    const cartItems = useSelector(state => state.shoppingCart.cartItems)
    // console.log('cart items selector: ', cartItems)

    useEffect(() => {
        dispatch(getAllShoppingCartsThunk())
        dispatch(allItemsThunk())
        dispatch(loadCartItemsThunk())
    }, [dispatch])

    
    return (
        <div className='shop-cart-container'>
        <div>
            <h1>Shopping Bag</h1>
        </div>
        {user === null ? (
            <NotLoggedInShoppingCart />
        ) : (
            <LoggedInShoppingCart user={user} items={items} carts={carts} cartItems={cartItems}/>
        )}
        </div>
    )

}

export default ShoppingCart;