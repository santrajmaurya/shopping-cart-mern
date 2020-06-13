import React from 'react';
import { useForm } from "react-hook-form";

import './SignUp.scss';

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

interface SignUpProps {
    displayName : string,
    email: string,
    password: string,
    confirmPassword: string
}

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUp: React.FC = () => {
    const { register, handleSubmit, reset, errors } = useForm<SignUpProps>({ defaultValues });

    const onSubmit = async (data: SignUpProps) => {
        const { displayName, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            alert("password don't match");

            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

        } catch(error) {
            console.error(error);
        }
        debugger
        reset(defaultValues);
    };

    return (
        <div className="sign-up">
            <h2 className='title'>I do not have a account.</h2>
            <span>Sign up with your email and password.</span>
            <form className='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='group'>
                    <input
                        className='form-input'
                        id='displayName'
                        type="text"
                        name="displayName"
                        ref={register({ required: true })}
                    />
                    {errors.displayName && errors.displayName.type === "required" && (
                        <div className="error">Display Name is required.</div>
                    )}
                    <label className='shrink form-input-label'>Display Name</label>
                </div>
                <div className='group'>
                    <input
                        className='form-input'
                        id='email'
                        type="email"
                        name="email"
                        ref={register({ required: true })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <div className="error">Email is required.</div>
                    )}
                    <label className='shrink form-input-label'>Email</label>
                </div>
                <div className='group'>
                    <input
                        className='form-input'
                        id='password'
                        type="password"
                        name="password"
                        ref={register({ required: true })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <div className="error">Password is required.</div>
                    )}
                    <label className='shrink form-input-label'>Password</label>
                </div>
                <div className='group'>
                    <input
                        className='form-input'
                        id='confirmPassword'
                        type="confirmPassword"
                        name="confirmPassword"
                        ref={register({ required: true })}
                    />
                    {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                        <div className="error">Confirm Password is required.</div>
                    )}
                    <label className='shrink form-input-label'>Confirm Password</label>
                </div>
                    <button className='custom-button' type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;