/// <reference path="react" />

declare namespace APP {
  /**
   * 约定式组件
   */
  export interface RouteFC<T = any> extends React.FC<T> {
    menu?: {
      name: string;
      icon?: React.ReactNode;
    }
    layout?: boolean | {

    };
  }
}
