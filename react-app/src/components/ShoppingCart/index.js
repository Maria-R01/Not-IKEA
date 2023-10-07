import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllShoppingCartsThunk } from '../../store/shoppingCart';
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

    useEffect(() => {
        dispatch(getAllShoppingCartsThunk())
        dispatch(allItemsThunk())
    }, [dispatch])

    
    return (
        <>
        <div>
            <h1>Shopping Bag</h1>
        </div>
        {user === null ? (
            <NotLoggedInShoppingCart />
        ) : (
            <LoggedInShoppingCart user={user} items={items} carts={carts}/>
        )}
        </>
    )

}

export default ShoppingCart;