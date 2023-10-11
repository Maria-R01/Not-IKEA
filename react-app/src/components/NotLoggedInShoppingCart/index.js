import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./NotLoggedinShoppingCart.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const NotLoggedInShoppingCart = () => {
  return (
    <>
      <div>
        <div className="not-loggedin-container">
          Please
          <span> </span>
          <OpenModalButton
            buttonText="Log In"
            // onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          <span> </span>
          or
          <span> </span>
          <OpenModalButton
            buttonText="Sign Up"
            // onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
          <span> </span>
          to add/view items in your shopping bag.
        </div>
      </div>
    </>
  );
};

export default NotLoggedInShoppingCart;
