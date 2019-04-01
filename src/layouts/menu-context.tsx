import { createContext } from 'react';

export interface IBasicLayoutContext {
  location: Location;
  breadcrumbNameMap: {};
}

export default createContext({} as IBasicLayoutContext);
