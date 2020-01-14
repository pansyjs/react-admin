import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import defaultSettings from '@/config/default-settings';

const { company } = defaultSettings;

const Copyright = () => {
  return (
    <div>
      Copyright <CopyrightOutlined /> 2020{company}技术部出品
    </div>
  );
};

export default Copyright;
