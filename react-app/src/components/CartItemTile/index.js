import './CartItemTile.css';
import { removeFromCartThunk, updateCartItemThunk } from '../../store/shoppingCart'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CartItemTile = ({cartItem, items, cartItems }) => {
    // console.log('ITEMS: ',items)
    // console.log('cartItem: ', cartItem)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentCartItem = cartItems.findIndex(cartItem => cartItem.item_id === cartItem.id)
    // console.log(currentCartItem)
    const itemIndex = items.findIndex(item => cartItem.item_id === item.id)
    const cartItemsSelector = useSelector((state) => state.shoppingCart.cartItems);
    const itemForCartItem = items.find(item => cartItem.item_id === item.id);
    const cartItemQuantity = itemForCartItem && cartItemsSelector?.filter(cartItem => cartItem.item_id === itemForCartItem.id)[0].quantity
    // console.log('CARTITEMS: ', cartItemQuantity) //line commented out when getting error
    // const imageUrl = itemForCartItem?.images[0]?.url;


    const handleIncrement = async () => {
        // Increase the quantity in the cart but not higher than available quantity for that item
        await dispatch(updateCartItemThunk(cartItem, cartItem.quantity + 1));
    
    };

    const handleDecrement = async () => {
        if (cartItem.quantity > 1) {
            // Decrease the quantity in the cart, but not below 1
            await dispatch(updateCartItemThunk(cartItem, cartItem.quantity - 1));
        }
    };

    const handleRemoveFromCart = (e) => {
        e.preventDefault();
        if (itemForCartItem) {
            dispatch(removeFromCartThunk(cartItem));
        }
    };

    return (
        <>
        <div className='item-in-cart'>
        <div className='item-image'>
            <img src={itemForCartItem?.images[0].url}></img>
        </div>
        <div className='item-details-container'>
        <div className='top-half'>
            <div className='item-details'>
                    <div>{itemForCartItem?.item_name}</div>
            </div>
            <div className='item-price'>
                    <div>$ {itemForCartItem?.price}</div>
            </div>
        </div>
        <div className='bottom-half'>
            <div className='update-delete-cart-item-container'>
                <div className='quantity'>
                    <div className='quantity-buttons-container'>
                        <button onClick={handleDecrement}>-</button>
                        <div>Quantity in cart: {cartItemQuantity}</div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </div>
                <div className='removal'>
                    <button onClick={handleRemoveFromCart}>Remove From Cart</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )

}

export default CartItemTile;