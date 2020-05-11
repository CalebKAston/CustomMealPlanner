import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6 border'>
        <form
          onSubmit={handleSubmit(() => {
            console.log('Submit the form');
          })}
        >
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              name='email'
              ref={register}
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              type='password'
              name='password'
              ref={register}
              className='form-control'
              id='exampleInputPassword1'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
