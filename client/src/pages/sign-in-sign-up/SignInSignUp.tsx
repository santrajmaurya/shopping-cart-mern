import React from 'react';

import './SignInSignUp.scss';

import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';


const SignInSignUp: React.FC = () => {

    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInSignUp;