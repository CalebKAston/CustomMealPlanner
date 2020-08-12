import React from 'react';
import { ExpandCollapseButton, ExpandCollapse } from './expand-collapse';

interface FilterProps {
  children: React.ReactNode;
}

const Filter = ({ children }: FilterProps) => {
  return (
    <>
      <div className='col-12'>
        <ExpandCollapseButton
          className='btn btn-secondary w-100'
          target='filter'
          defaultExpanded={false}
        >
          Filter
        </ExpandCollapseButton>
      </div>
      <div className='col-12'>
        <ExpandCollapse id='filter' border={true}>
          {children}
        </ExpandCollapse>
      </div>
    </>
  );
};

export default Filter;
