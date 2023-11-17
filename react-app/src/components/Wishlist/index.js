import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistThunk, removeFromWishlistThunk } from '../../store/wishlist';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist?.wishlist);

  useEffect(() => {
    // Fetch the user's wishlist when the component mounts
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlistThunk(itemId));
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist?.map((itemId) => (
          <li key={itemId}>
            Item ID: {itemId}
            <button onClick={() => handleRemoveFromWishlist(itemId)}>
              Remove from Wishlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
