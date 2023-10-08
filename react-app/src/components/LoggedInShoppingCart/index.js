import './LoggedInShoppingCart.css';
import EmptyCart from '../EmptyCart';
import CartItemTile from '../CartItemTile';

const LoggedInShoppingCart = ({user, items, carts, cartItems}) => {

    return (
        <>
        {cartItems.length === 0 ? (
            <EmptyCart />
        ) : (
            <>
            {cartItems.map(cartItem => (
                <CartItemTile cartItem={cartItem} items={items} cartItems={cartItems} key={cartItem.id}/>
            ))}
            </>
        )}
        <div>
            <div>LOGGED IN SHOPPING CART COMPONENT</div>
        </div>
        </>
    )

}

export default LoggedInShoppingCart;