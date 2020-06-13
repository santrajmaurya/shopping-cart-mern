import React from 'react';

import './CustomButton.scss';

interface CustomButtonProps  {
    type?: string;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ type, onClick, children, ...otherProps}) => {

    return (
        <button className='custom-button' {...otherProps}> 
          {children}
        </button>
);
}

export default CustomButton;