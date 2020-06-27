import React, { useState, useCallback, useContext } from "react";
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
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import { RootStore } from './store/RootStore';

const rootStore = new RootStore();

export const RootStoreContext = React.createContext({
  rootStore,
  isLoggedIn: false,
  userId: null,
  login: (id: string) => { },
  logout: () => { }
});


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState(null);
  const { rootStore } = useContext(RootStoreContext);
  const { userStore } = rootStore;

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  

  return (
    <Observer>
      {() => (
        <RootStoreContext.Provider value={{ rootStore: rootStore, isLoggedIn: isLoggedIn, login: login, logout: logout, userId: userId  }}>
          <HeaderComponent />
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
            <Route exact path="/signin" render={() => userStore.isLogin ? (<Redirect to='/' />) : (<SignIn />) } />
          </Switch>
        </RootStoreContext.Provider>
      )}
      </Observer>
  );
};

export default App;
