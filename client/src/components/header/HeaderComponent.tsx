// @ts-nocheck
import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from "../../assests/crown.svg";
import { RootStoreContext } from "../../App";
import CartIcon from '../cart-icon/CartIcon';

const { Header } = Layout;
interface HeaderComponentProps {
  userId: any
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ userId }) => {
  const { userStore } = useContext(RootStoreContext);
 
  const handleSignOut = () => {
    localStorage.removeItem('userData');
     userStore.signOut();
  }

  return (
    <Observer>
      {() => (
        <Header>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={4}>
              <Link className='logo-container' to='/'>
                <Logo style={{ marginTop: '8px' }} />
              </Link>
            </Col>
            <Col className="gutter-row" span={20}>
              <Menu theme="dark" mode="horizontal" style={{ float: 'right', fontSize: '20px' }}>
                <Menu.Item key="/shop">
                  <Link to="/shop">Shop</Link>
                </Menu.Item>
                <Menu.Item key="/orders">
                  <Link to="/orders">Orders</Link>
                </Menu.Item>
                <Menu.Item key="/add-products">
                  <Link to="/add-products">Add Products</Link>
                </Menu.Item>
                <Menu.Item key="/admin-products">
                  <Link to="/admin-products">Admin Products</Link>
                </Menu.Item>
                <Menu.Item key="/contact">
                  <Link to="/contact">Contact</Link>
                </Menu.Item>
                {(userId || userStore.token) ? (
                  <Menu.Item key="/signout">
                    <Link to="/" onClick={handleSignOut}>Sign Out</Link>
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
