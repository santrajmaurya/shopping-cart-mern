// @ts-nocheck
import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Observer } from 'mobx-react-lite';

import HeaderComponent from "./components/header/HeaderComponent";
import ShopPage from "./components/shop/ShopPage";
import AddProducts from './components/admin-products/AddProducts';
import EditProducts from './components/admin-products/EditProducts';
import AdminProducts from './components/admin-products/AdminProducts';
import ContactUs from './components/contact-us/ContactUs';
import OrderList from './components/orders/OrderList';
import CheckoutPage from './components/checkout/CheckoutPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MyAccount from './components/my-account/MyAccount';
import { RootStore } from './store/RootStore';

const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);


const App: React.FC = () => {
  const { userStore } = useContext(RootStoreContext);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token) {
      const { userId } = storedData;
      userStore.getUserDetails(userId);
   }
  }, [userStore]);
   
  return (
    <Observer>
      {() => (
        <RootStoreContext.Provider value={rootStore}>
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={ShopPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/admin-products" component={AdminProducts} />
            <Route path="/add-products" component={AddProducts} />
            <Route path="/edit-product/:productId" component={EditProducts} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/my-account" component={MyAccount} />
             <Route exact path="/orders" component={OrderList} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </RootStoreContext.Provider>
      )}
      </Observer>
  );
};

export default App;
