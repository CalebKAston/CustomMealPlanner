import React from 'react';

interface ExpandCollapseProps {
  id: string;
  children: React.ReactNode;
  border?: boolean;
}

export const ExpandCollapse = ({
  id,
  children,
  border = true,
}: ExpandCollapseProps) => {
  return (
    <div className='collapse' id={id}>
      <div className={`col-12 pt-3 ${border ? 'border' : ''}`}>
        <div className='row'>{children}</div>
      </div>
    </div>
  );
};

interface ExpandCollapseButtonProps {
  className: string;
  target: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export const ExpandCollapseButton = ({
  className,
  target,
  defaultExpanded = true,
  children,
}: ExpandCollapseButtonProps) => {
  return (
    <button
      className={className}
      type='button'
      data-toggle='collapse'
      data-target={`#${target}`}
      aria-expanded={defaultExpanded}
      aria-controls={target}
    >
      {children}
    </button>
  );
};
