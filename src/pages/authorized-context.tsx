import { createContext } from 'react';
import Policy from '@jiumao/policy';

export type IProviderStore = {
  policy: Policy;
};

export default createContext({} as IProviderStore);
