// @ts-nocheck
import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Observer } from 'mobx-react-lite';

import HeaderComponent from "./components/header/HeaderComponent";
import ShopPage from "./components/Shop/ShopPage";
import AddProducts from './components/admin-products/AddProducts';
import EditProducts from './components/admin-products/EditProducts';
import AdminProducts from './components/admin-products/AdminProducts';
import ContactUs from './components/ContactUs/ContactUs';
import OrderList from './components/orders/OrderList';
import CheckoutPage from './components/checkout/CheckoutPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { RootStore } from './store/RootStore';

const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);


const App: React.FC = () => {
  const { userStore } = useContext(RootStoreContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token) {
     const { userId } = storedData;
     setUserId(userId);
     userStore.getUserDetails(userId);
   }
  }, [userStore]);
   
  return (
    <Observer>
      {() => (
        <RootStoreContext.Provider value={rootStore}>
          <HeaderComponent userId={userId} />
          <Switch>
            <Route exact path="/" component={ShopPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/admin-products" component={AdminProducts} />
            <Route path="/add-products" component={AddProducts} />
            <Route path="/edit-product/:productId" component={EditProducts} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/orders" component={OrderList} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" render={() => userStore.userId ? (<Redirect to='/' />) : (<SignIn />) } />
          </Switch>
        </RootStoreContext.Provider>
      )}
      </Observer>
  );
};

export default App;
