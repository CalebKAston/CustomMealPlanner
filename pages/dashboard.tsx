import React from 'react';
import { withRedux } from '../lib/redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

const CursorPointerDiv = styled.div`
  cursor: pointer;
`;

const WelcomeMessage = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const Dashboard = () => {
  const userName = useSelector((state) => state.userName);

  return (
    <>
      <div className='row'>
        <div className='col-12 mb-5'>
          <WelcomeMessage>Welcome, {userName}</WelcomeMessage>
        </div>
        <div className='col-12 mb-3'>
          <Link href='meal-plans'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Meal Plans</h5>
                <p className='card-text'>
                  Create/customize your personal meal plans.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-6 mb-3'>
          <Link href='meals'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Meals</h5>
                <p className='card-text'>
                  Create/customize your personal meals.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-6 mb-3'>
          <Link href='/recipes'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Recipes</h5>
                <p className='card-text'>
                  Create/customize your personal recipes.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-3 mb-3'>
          <Link href='/ingredients'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Ingredients</h5>
                <p className='card-text'>
                  Create/customize your personal ingredients.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-3 mb-3'>
          <Link href='/schedules'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Schedule Templates</h5>
                <p className='card-text'>
                  Create/customize your personal schedule templates.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-3 mb-3'>
          <Link href='/schedule-pieces'>
            <CursorPointerDiv className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Schedule Pieces</h5>
                <p className='card-text'>
                  Create/customize your personal schedule pieces.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
        <div className='col-3 mb-3'>
          <Link href='/measurements'>
            <CursorPointerDiv className='card cursor-pointer'>
              <div className='card-body'>
                <h5 className='card-title'>Measurements</h5>
                <p className='card-text'>
                  Create/customize your personal measurements.
                </p>
              </div>
            </CursorPointerDiv>
          </Link>
        </div>
      </div>
    </>
  );
};

export default withRedux(Dashboard);
