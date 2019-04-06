import { createContext } from 'react';
import H from 'history';
import { IMenu } from '@/components/side-menu';

export type IProviderStore =  {
  location?: H.Location;
  breadcrumbNameMap: { [path: string]: IMenu };
};

export default createContext({} as IProviderStore);
