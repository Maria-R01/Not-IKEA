import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { loadCartItemsThunk } from '../../store/shoppingCart';

function Navigation({ isLoaded }){
	// const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	// const cartItemsLength = useSelector(state => state.shoppingCart.cartItems?.length)
	const handleSearchSubmit = (e) => {
		e.preventDefault();
	};

	// useEffect(() => {
	// 	dispatch(loadCartItemsThunk())
	// }, [dispatch, cartItemsLength])

	return (
		<div className='nav-bar-container'>
			<NavLink className='logo-container' exact to="/">
				<img className='logo' src='https://substackcdn.com/image/fetch/w_848,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd37204f6-f104-4dd0-9969-f63464023cde_600x600.png'></img>
			</NavLink>
			<form className="search-bar" onSubmit={handleSearchSubmit}>
				<input type="text" placeholder="What are you looking for?" />
				<button type="submit" onClick={() => window.alert('Feature Coming Soon...')}>
				<i className="fa-solid fa-search fa-lg"></i>
				</button>
			</form>
			<div className='right-icons'>
			<div className='home-container'>
				<NavLink exact to="/home">
					<i class="fa-solid fa-house"></i>
				</NavLink>
			</div>
			<div className="cart-icon">
				<NavLink to="/cart">
					<i className="fa-solid fa-cart-plus fa-lg"></i>
					{/* {cartItemsLength >= 1 && sessionUser ? (
						<span className="cart-item-count">{cartItemsLength}</span>
					) : <></>} */}
				</NavLink>
			</div>
			{isLoaded && (
				<div className='profile-button'>
					<ProfileButton user={sessionUser} />
				</div>
			)}

			</div>
		</div>
		
	);
}

export default Navigation;