import { FunctionComponent } from 'react';
import { RouteComponentProps as BasicRouteProps, RouteProps, match } from 'react-router-dom';

export type PFC<P = {}> = FunctionComponent<P> & {
  title?: string;
  authority?: string | string[];
  // 设置为false则不使用默认布局
  useDefaultLayout?: boolean;
};

type IncludeRoute = 'component' | 'exact' | 'path';

type RouteType = Pick<RouteProps, IncludeRoute>;

export interface RouterTypes<T extends Object = {}, P = {}> extends BasicRouteProps {
  computedMatch?: match<P>;
  route?: RouteType & T;
}
