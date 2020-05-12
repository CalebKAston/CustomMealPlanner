import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { withRedux } from '../lib/redux';
import { checkAuth } from '../api/authentication';
import { actionTypes } from '../store';

function Layout({ router, children }) {
  const { asPath } = router;
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.isLoggedIn);

  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('cmpAccessToken');

    useEffect(() => {
      checkAuth(accessToken)
        .then((response) => {
          dispatch({
            type: actionTypes.setIsLoggedIn,
            isLoggedIn: response.isLoggedIn,
          });
          if (!response.isLoggedIn && asPath !== '/' && asPath !== '/register')
            router.push('/login');
        })
        .catch((error) => console.error(error));
    }, [accessToken]);
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/'>
          CustomMealPlanner
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        {isLoggedIn && (
          <div className='collapse navbar-collapse' id='navbarContent'>
            <ul className='navbar-nav mr-auto'>
              <li
                className={`nav-item ${
                  asPath === '/dashboard' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/dashboard'>
                  Dashboard
                </a>
              </li>
              <li
                className={`nav-item ${
                  asPath === '/meal-plans' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/meal-plans'>
                  Meal Plans
                </a>
              </li>
              <li className={`nav-item ${asPath === '/meals' ? 'active' : ''}`}>
                <a className='nav-link' href='/meals'>
                  Meals
                </a>
              </li>
              <li
                className={`nav-item ${asPath === '/recipes' ? 'active' : ''}`}
              >
                <a className='nav-link' href='/recipes'>
                  Recipes
                </a>
              </li>
              <li
                className={`nav-item ${
                  asPath === '/ingredients' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/ingredients'>
                  Ingredients
                </a>
              </li>
              <li
                className={`nav-item ${
                  asPath === '/schedules' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/schedules'>
                  Schedules
                </a>
              </li>
              <li
                className={`nav-item ${
                  asPath === '/schedule-pieces' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/schedule-pieces'>
                  Schedule Pieces
                </a>
              </li>
              <li
                className={`nav-item ${
                  asPath === '/measurements' ? 'active' : ''
                }`}
              >
                <a className='nav-link' href='/measurements'>
                  Measurements
                </a>
              </li>
            </ul>
          </div>
        )}
        {!isLoggedIn && (
          <div className='collapse navbar-collapse' id='navbarContent'>
            <ul className='navbar-nav ml-auto'>
              <li className={`nav-item ${asPath === '/login' ? 'active' : ''}`}>
                <a className='nav-link' href='/login'>
                  Login
                </a>
              </li>
              <li
                className={`nav-item ${asPath === '/register' ? 'active' : ''}`}
              >
                <a className='nav-link' href='/register'>
                  Create Account
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className='container py-4'>{children}</div>
    </>
  );
}

export default withRedux(withRouter(Layout));
