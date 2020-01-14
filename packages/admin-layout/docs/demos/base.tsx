import React, { useState } from 'react';
import Layout from '@pansy/admin-layout';

export default () => {
  return (
    <div
      id="base"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden'
      }}
    >
      <Layout />
    </div>
  );
};
