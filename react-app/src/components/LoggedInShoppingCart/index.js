import './LoggedInShoppingCart.css';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EmptyCart from '../EmptyCart';
import CartItemTile from '../CartItemTile';

const LoggedInShoppingCart = ({user, items, carts}) => {
    // console.log("user: ", user)
    // console.log("items: ", items)
    // console.log("carts: ", carts)
    const userCart = carts.filter(cart => cart.user_id === user.id)
    console.log(userCart)


    return (
        <>
        {userCart.length === 0 ? (
            <EmptyCart />
        ) : (
            <>
            {userCart.map(cartItem => (
                <CartItemTile cartItem={cartItem} items={items} key={cartItem.id}/>
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