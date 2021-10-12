/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */

import './App.css';
import Header from './Componets/Header/Header';
import Shop from './Componets/Shop/Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Componets/Review/review';
import Inventory from './Componets/Invertory/Inventory';
import NotFound from './Componets/NotFound/NotFound';
import ProductDetails from './Componets/ProductDetails/ProductDetails';
import Condition from './Componets/Condition/Condition';
import { createContext, useState } from 'react';
import MealDetails from './Componets/MealDetails/MealDetails';
import MealFinder from './Componets/MealFInder/MealFinder';
import SearchFind from './Componets/SearchFind/SearchFind';
import Login from './Componets/Login/Login';
import Shipment from './Componets/Shipment/Shipment';
import PrivateRoute from './Componets/PrivateRoute/PrivateRoute';


export const categoryContext = createContext();
export const UserContext = createContext();

function App() {

  const [familiar, setFamiliar] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h3>Email: {loggedInUser.email}</h3> */}
      <Router >
        <Header />
        <Switch>
          <Route path="/shop" >
            <Shop />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>

      {/* <categoryContext.Provider value={'laptop'}>
        <h2>Is Friend: {familiar.toString(false)}</h2>
        <button type="button" onClick={() => setFamiliar(!familiar)}>Toggle</button>
        <Condition familiar={familiar} />
      </categoryContext.Provider>
      <MealDetails />
      <MealFinder />
      <SearchFind /> */}
    </UserContext.Provider>

  );
}



export default App;

