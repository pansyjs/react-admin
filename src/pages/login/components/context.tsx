import { Context, createContext } from 'react';

export interface LoginContextProps {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const LoginContext: Context<LoginContextProps> = createContext({});

export default LoginContext;
