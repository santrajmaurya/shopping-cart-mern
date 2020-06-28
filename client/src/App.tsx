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
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { RootStore } from './store/RootStore';

const rootStore = new RootStore();

export const RootStoreContext = React.createContext({
  rootStore,
  // isLoggedIn: false,
  // userId: '',
  // token: null,
  // login: (id: string, token: any) => { },
  // logout: () => { }
});


const App: React.FC = () => {
  // const [token, setToken] = useState<any>(null);
  // const [userId, setUserId] = useState<any>('');
  const { rootStore } = useContext(RootStoreContext);
  const { userStore } = rootStore;

  // const login = useCallback((uid, token) => {
  //   setToken(token);
  //   setUserId(uid);
  // }, []);

  // const logout = useCallback(() => {
  //   setToken(null);
  //   setUserId('');
  // }, []);
  

  return (
    <Observer>
      {() => (
        <RootStoreContext.Provider value={{ rootStore: rootStore }}>
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
            <Route exact path="/signin" render={() => userStore.token ? (<Redirect to='/' />) : (<SignIn />) } />
          </Switch>
        </RootStoreContext.Provider>
      )}
      </Observer>
  );
};

export default App;
