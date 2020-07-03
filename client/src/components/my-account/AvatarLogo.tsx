// @ts-nocheck
import React, { useContext} from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";


const AvatarLogo: React.FC = observer(() => {
    const { userStore } = useContext(RootStoreContext);

    const handleSignOut =  () => {
        localStorage.removeItem('userData');
        userStore.signOut();
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/my-account">My Account</Link>
            </Menu.Item>
            {userStore.checkIfSignIn ? (
                  <Menu.Item key="/signout">
                    <Link to="/" onClick={handleSignOut}>Sign Out</Link>
                  </Menu.Item>
                ) : (
                    <Menu.Item key="/signin">
                      <Link to="/signin">Sign In</Link>
                    </Menu.Item>
                  )}
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} placement="bottomCenter">
                <Avatar style={{ backgroundColor: '#1da57a', marginTop: '-7px' }} size="large" src="https://pbs.twimg.com/profile_images/639378592661553153/qwaUwMy9_400x400.jpg" />
            </Dropdown>
        </>
    )
});

export default AvatarLogo;


