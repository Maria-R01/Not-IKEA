import './CartItemTile.css';

const CartItemTile = ({cartItem, items }) => {
    // console.log('ITEMS: ',items)
    const itemIndex = items.findIndex(item => cartItem.item_id === item.id)
    const itemForCartItem = items[itemIndex]
    // const imageUrl = itemForCartItem?.images[0]?.url;
    

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
                        <button>-</button>
                        <div>Quantity in cart: {cartItem.quantity}</div>
                        <button>+</button>
                    </div>
                </div>
                <div className='removal'>
                    <button>Remove From Cart</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    )

}

export default CartItemTile;