// @ts-nocheck
import React from "react";
import { Observer } from "mobx-react-lite";
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from "../../assests/crown.svg";
import CartIcon from '../cart-icon/CartIcon';
import AvatarLogo from '../my-account/AvatarLogo';

const { Header } = Layout;
interface HeaderComponentProps {
}

const HeaderComponent: React.FC<HeaderComponentProps> = () => {

  return (
    <Observer>
      {() => (
        <Header style={{height: '66px'}}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={2}>
              <Link className='logo-container' to='/'>
                <Logo style={{ marginTop: '8px' }} />
              </Link>
            </Col>
            <Col className="gutter-row" span={22}>
              <Menu theme="dark" mode="horizontal" style={{ float: 'right', fontSize: '16px' }}>
                <Menu.Item key="/admin">
                  <Link to="/admin">Admin</Link>
                </Menu.Item>
                <Menu.Item key="/contact">
                  <Link to="/contact">Contact</Link>
                </Menu.Item>
                <Menu.Item key="/checkout">
                  <Link to="/checkout"><CartIcon /></Link>
                </Menu.Item>
                <Menu.Item key="/">
                  <Link to="/"><AvatarLogo /></Link>
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
