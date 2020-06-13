import React from "react";
import { useForm } from "react-hook-form";

import "./SignIn.scss";

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

type SignInProps = {
    email: string;
    password: string;
};

 const defaultValues = {
  email: "",
  password: ""
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, reset, errors } = useForm<SignInProps>({defaultValues});

  const onSubmit = async (data: SignInProps) => {

    const {  email, password } = data;

    try {
      await auth.signInWithEmailAndPassword(email, password);

    } catch(error) {

      console.log(error);
    }
    reset(defaultValues);
  };

  return (
    <div className="sign-in">
      <h2 className='title'>I already have an account.</h2>
      <span>Sign in with your email and password.</span>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <label className='shrink form-input-label'>email</label>
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
          <label className='shrink form-input-label'>password</label>
        </div>
        <div className='buttons'>
          <button className='custom-button' type="submit">Sign In</button>
          <button className='custom-button google-sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
