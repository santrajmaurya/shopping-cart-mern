import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './MenuItem.scss';

interface MenuItemProps {
    title : string,
    imageUrl: string,
    size?: string;
    history: string;
    linkUrl: string;
    match: string;
}

const MenuItem: React.FC<MenuItemProps & RouteComponentProps> = ({ title, imageUrl, size, history, linkUrl, match}) => {
    return (
        <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
            <div style={{ backgroundImage: `url(${imageUrl})`}} className='background-image' />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP</span>
            </div>
        </div>
    );
};

export default withRouter(MenuItem);