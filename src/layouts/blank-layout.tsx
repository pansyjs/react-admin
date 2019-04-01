import React from 'react';

const BlankLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <div>{children}</div>
  )
};

export default BlankLayout;
