import { FunctionComponent } from 'react';

export type PFC<P = {}> = FunctionComponent<P> & {
  title?: string;
  authority?: string | string[];
};
