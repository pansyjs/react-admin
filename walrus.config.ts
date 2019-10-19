import { IConfig } from '@walrus/types';

const config: IConfig = {
  plugins: [
    ['@walrus/walrus-plugin-update-config', {
      dir: 'dist',
      iterator: (key, obj) => {
        if (key === 'baseURL') {
          return 'test';
        }
        return obj[key];
      }
    }]
  ]
};

export default config;
