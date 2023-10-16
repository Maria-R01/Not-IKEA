import './LoggedInShoppingCart.css';
import EmptyCart from '../EmptyCart';
import CartItemTile from '../CartItemTile';
import Checkout from '../Checkout';
import OpenModalButton from "../OpenModalButton";


const LoggedInShoppingCart = ({user, items, carts, cartItems}) => {
    const runningTotal = cartItems.reduce((total, cartItem) => {
        const itemForCartItem = items.find((item) => cartItem.item_id === item.id);
        return total + itemForCartItem?.price * cartItem.quantity;
    }, 0);

    return (
        <>
        {cartItems.length === 0 ? (
            <EmptyCart />
        ) : (

            <div className='container'>
             <div className='cart-items-container'>
                {cartItems.map(cartItem => (
                    <CartItemTile cartItem={cartItem} items={items} cartItems={cartItems} key={cartItem.id}/>
                ))}
            </div>
            <div className='order-summary-container'>
                <h3>Order Summary:</h3>
                <div className="running-total">
                    Cart Total (excluding tax): ${runningTotal.toFixed(2)}
                </div>
                <div className='checkout-button'>
                    <OpenModalButton buttonText={`Checkout`} modalComponent={<Checkout />}/>
                </div>
            </div>
            </div>
            
        )}
        </>
    )

}

export default LoggedInShoppingCart;