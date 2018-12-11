import { createContext } from 'react';
import H from 'history';

export interface ProviderStore {
  location: H.Location;
  breadcrumbNameMap: any[];
}

export default createContext({} as ProviderStore);
