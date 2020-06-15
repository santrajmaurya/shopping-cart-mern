import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Observer } from 'mobx-react-lite';

import HeaderComponent from "./components/header/HeaderComponent";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import CheckoutPage from './pages/checkout/CheckoutPage';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { RootStore } from './store/RootStore';


const rootStore = new RootStore();
export const RootStoreContext = React.createContext(rootStore);


const App: React.FC = () => {
  const { userStore } = useContext(RootStoreContext);

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef: any = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot: any) => {
          userStore.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      userStore.setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [userStore]);

  return (
    <Observer>
      {() => (
        <RootStoreContext.Provider value={rootStore}>
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" render={() => userStore.currentUser ? (<Redirect to='/' />) : (<SignIn />) } />
          </Switch>
        </RootStoreContext.Provider>
      )}
      </Observer>
  );
};

export default App;
