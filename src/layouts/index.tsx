import React, { FC, useEffect } from 'react';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import { pathToRegexp } from 'path-to-regexp';
import { BLANK_LAYOUT_ROUTERS } from '@/config';
import BlankLayout from './blank-layout';

export interface BasicLayoutProps extends ProLayoutProps {

}

const BasicLayout: FC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/'
    }
  } = props;

  let isUseBlankLayout = false;

  BLANK_LAYOUT_ROUTERS.forEach((item: string) => {
    if (pathToRegexp(item).test(location.pathname as string)) {
      isUseBlankLayout = true;
    }
  })

  if (BLANK_LAYOUT_ROUTERS.includes(location.pathname as string)) {
    return <BlankLayout>{children}</BlankLayout>
  }

  return (
    <div>
      Layout
      {children}
    </div>
  )
}

export default BasicLayout;
