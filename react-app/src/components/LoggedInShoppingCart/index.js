import './LoggedInShoppingCart.css';
import EmptyCart from '../EmptyCart';
import CartItemTile from '../CartItemTile';

const LoggedInShoppingCart = ({user, items, carts, cartItems}) => {

    return (
        <>
        {cartItems.length === 0 ? (
            <EmptyCart />
        ) : (
            <div className='cart-items-container'>
            {cartItems.map(cartItem => (
                <CartItemTile cartItem={cartItem} items={items} cartItems={cartItems} key={cartItem.id}/>
            ))}
            </div>
        )}
        </>
    )

}

export default LoggedInShoppingCart;