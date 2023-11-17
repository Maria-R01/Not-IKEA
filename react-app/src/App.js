import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing"
import HomePage from "./components/HomePage"
import IndividualItems from "./components/IndividualItems"
import ShoppingCart from "./components/ShoppingCart"
import Footer from "./components/Footer";
import SearchResults from './components/SearchResults'
import AccountManagement from "./components/AccountManagement";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path ="/" component={Landing} />
          <Route exact path ="/home" component={HomePage} />
          <Route exact path ="/item/:itemId" component={IndividualItems} />
          <Route exact path ="/cart" component={ShoppingCart} />
          <Route exact path ='/search-results/:searchInput' component={SearchResults} />
          <Route exact path = '/account' component={AccountManagement} />
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
