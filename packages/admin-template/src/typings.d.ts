declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare const BASE_URL: string;

// 本项目类型申明
declare namespace APP {
  export interface IUser {
    id?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    username?: string;
    remark?: string;
  }

  export interface ICurrentUser extends IUser {
    name?: string;
  }
}

interface Window {
  baseURL: string;
}
