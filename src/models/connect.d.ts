import { RouterTypes } from 'umi';
import { IRoute } from 'umi-types';
import { match } from 'react-router-dom';

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<IRoute>> {
    dispatch?: Dispatch;
    match?: match<P>;
  }
