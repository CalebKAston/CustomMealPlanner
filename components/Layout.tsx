import React from 'react';
import { withRouter } from 'next/router';

function Layout({ router, children }) {
  const { asPath } = router;
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
      </nav>
      <div className='container py-4'>{children}</div>
    </>
  );
}

export default withRouter(Layout);
