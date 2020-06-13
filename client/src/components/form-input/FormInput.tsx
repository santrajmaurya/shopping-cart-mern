import React from 'react';

import './FormInput.scss';

type FormInputProps = {
    id: string;
    type: string;
    name: string;
    label : string;
    ref: any
}

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => (
    <div className='group'>
        <input className='form-input' {...otherProps} />
        {label ? (
            <label
                className={`${
                    otherProps ? 'shrink' : ''
                    } form-input-label`}
            >
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInput;