import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Observer } from "mobx-react-lite";
import { Layout, Menu, Row, Col } from 'antd';

import { ReactComponent as Logo } from "../../assests/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { RootStoreContext } from "../../App";
import CartIcon from '../cart-icon/CartIcon';
import './HeaderComponent.scss';

const { Header } = Layout;
interface HeaderComponentProps {
}

const HeaderComponent: React.FC<HeaderComponentProps> = () => {
  const { userStore } = useContext(RootStoreContext);

  return (
    <Observer>
      {() => (
        <Header>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={4}>
              <Link className='logo-container' to='/'>
                <Logo style={{ marginTop: '8px' }}  />
              </Link>
            </Col>
            <Col className="gutter-row" span={20}>
              <Menu theme="dark" mode="horizontal" style={{ float: 'right', fontSize: '20px' }}>
                <Menu.Item key="/shop">
                  <Link to="/shop">Shop</Link>
                </Menu.Item>
                <Menu.Item key="/contact">
                  <Link to="/contact">Contact</Link>
                </Menu.Item>
                {userStore.currentUser ? (
                  <Menu.Item key="/signout">
                    <Link to="/" onClick={() => auth.signOut()}>Sign Out</Link>
                  </Menu.Item>
                ) : (
                    <Menu.Item key="/signin">
                      <Link to="/signin">Sign In</Link>
                    </Menu.Item>
                )}
                <Menu.Item key="/checkout">
                  <Link to="/checkout"><CartIcon /></Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
      )}
    </Observer>
  );
};

export default HeaderComponent;
