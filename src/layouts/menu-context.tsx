import { createContext } from 'react';

export interface IProviderStore {
  location: Location;
  breadcrumbNameMap: object;
}

export default createContext({} as IProviderStore);
