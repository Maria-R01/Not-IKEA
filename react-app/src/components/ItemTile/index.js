import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./ItemTile.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../../store/shoppingCart";
import { useState, useEffect } from "react";
import { addToWishlistThunk, fetchWishlistThunk, removeFromWishlistThunk } from "../../store/wishlist";

const ItemTile = ({ item }) => {
  // console.log('item in itemTile: ', item) //need to add avg rating and rating count
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const loggedIn = user !== null;
  const [addedToCart, setAddedToCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCartThunk(item, 1));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  const handleToggleWishlist = () => {
    if (loggedIn) {
      if (inWishlist) {
        dispatch(removeFromWishlistThunk(item.id));
      } else {
        dispatch(addToWishlistThunk(item.id));
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchWishlistThunk());
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    if (loggedIn && user.wishlist?.includes(item.id)) {
      setInWishlist(true);
    } else {
      setInWishlist(false);
    }
  }, [loggedIn, user.wishlist, item.id]);

  const formattedPrice = item.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="item-tile">
      <NavLink to={`/item/${item.id}`}>
        <div key={item.id}>
          <div className="itemTile-image-container">
            <img src={item.images[0].url}></img>
          </div>
          <div className="top-half-container">
            <div className="item-name">{item.item_name}</div>
            {loggedIn && (
            <>
              <div className="add-cart-button">
                <button onClick={handleAddToCart}>
                  {addedToCart ? (
                    <i className="fa-solid fa-check-circle fa-lg"></i>
                  ) : (
                    <i className="fa-solid fa-cart-plus fa-lg"></i>
                  )}
                </button>
              </div>
              {/* <div className="add-cart-button">
              <button onClick={handleToggleWishlist}>
                  {inWishlist ? (
                    <i className="fa-solid fa-heart fa-lg heart-icon-filled"></i>
                  ) : (
                    <i className="fa-solid fa-heart fa-lg"></i>
                  )}
                </button>
              </div> */}
              </>
            )}
          </div>
          <div className="price-rating-container">
            <div className="item-price">${item.price.toFixed(2)}</div>
            <div className="ratings">
              ★ {item.average_rating.toFixed(1)} ({item.review_count})
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ItemTile;
