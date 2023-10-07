import './CartItemTile.css';

const CartItemTile = ({cartItem, items }) => {

    return (
        <>
        <div className='item-in-cart'>
        <div className='item-image'>
            <img></img>
        </div>
        <div className='item-details-container'>
        <div className='top-half'>
            <div className='item-details'>
                    <div></div>
            </div>
            <div className='item-price'>
                    <div></div>
            </div>
        </div>
        <div className='bottom-half'>
            <div className='update-delete-cart-item-container'>
                <div className='quantity'>
                    <div></div>
                </div>
                <div className='removal'>
                    <div></div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div className='order-summary-container'>
        <div className='order-summary'>
            <div>
                Order Summary
            </div>
            <div className='subtotal'>
                Total (Excluding Taxes)
                <div>
                    $
                </div>
            </div>
        </div>
        <div className='checkout-button-container'>
            <button>Continue To Checkout</button>
        </div>
    </div>
    </>
    )

}

export default CartItemTile;