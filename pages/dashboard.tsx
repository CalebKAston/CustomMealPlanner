import React, { useEffect } from 'react';
import { withRedux } from '../lib/redux';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../api/authentication';
import Router from 'next/router';

const Dashboard = () => {
  const dispatch = useDispatch();

  if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('cmpAccessToken');

    useEffect(() => {
      checkAuth(accessToken)
        .then((response) => {
          if (!response.isLoggedIn) Router.push('/login');
        })
        .catch((error) => console.error(error));
    }, [accessToken]);
  }

  return <div>Dashboard Page</div>;
};

export default withRedux(Dashboard);
