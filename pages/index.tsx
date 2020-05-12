import React from 'react';
import { withRedux } from '../lib/redux';

const IndexPage = () => {
  return (
    <>
      <h1>Create Custom Meal Plans</h1>
      <p>Oh yeah, it's cool.</p>
      <h1>Easy Shopping Lists</h1>
      <p>Oh yeah, baby.</p>
      <h1>Match Your Schedule</h1>
      <p>Oh yeah, so convenient.</p>
    </>
  );
};

export default withRedux(IndexPage);
