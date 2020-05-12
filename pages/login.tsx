import React from 'react';
import { useForm } from 'react-hook-form';
import { withRedux } from '../lib/redux';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { actionTypes } from '../store';
import { login } from '../api/authentication';
import Router from 'next/router';

export interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6 border py-3'>
        <form
          className='mb-3'
          onSubmit={handleSubmit((formData) => {
            dispatch({
              type: actionTypes.toggleIsLoading,
            });
            login(formData)
              .then((response) => {
                if (typeof window !== 'undefined')
                  localStorage.setItem('cmpAccessToken', response.accessToken);
                dispatch({
                  type: actionTypes.toggleIsLoading,
                });
                Router.push('/dashboard');
              })
              .catch((error) => {
                dispatch({
                  type: actionTypes.toggleIsLoading,
                });
                console.log(error);
              });
          })}
        >
          <div className='form-group'>
            <label htmlFor='loginEmail'>Email address</label>
            <input
              type='email'
              name='email'
              ref={register({
                required: 'Email is required',
              })}
              className={`form-control ${errors.email ? 'border-danger' : ''}`}
              id='loginEmail'
            />
            {errors.email && (
              <small className='form-text text-danger'>
                {errors.email.message}
              </small>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='loginPassword'>Password</label>
            <input
              type='password'
              name='password'
              ref={register({
                required: 'Password is required',
              })}
              className={`form-control ${
                errors.password ? 'border-danger' : ''
              }`}
              id='loginPassword'
            />
            {errors.password && (
              <small className='form-text text-danger'>
                {errors.password.message}
              </small>
            )}
          </div>
          <button
            type='submit'
            className='btn btn-primary w-100'
            disabled={isLoading}
          >
            {!isLoading && 'Log In'}
            {isLoading && (
              <PulseLoader loading={true} color='white' size={8} margin={3} />
            )}
          </button>
        </form>
        <div className='text-center'>
          Don't have an account? <a href='/register'>Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default withRedux(Login);
