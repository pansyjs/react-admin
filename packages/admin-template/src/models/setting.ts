import { Reducer } from 'redux';
import settings, { DefaultSettings } from '@/config/default-settings';

export interface ISettingModelState extends DefaultSettings {}

export interface ISettingModel {
  name: 'setting';
  state: DefaultSettings;
  reducers: {
    getSetting: Reducer<DefaultSettings>;
  };
}

const SettingModel: ISettingModel = {
  name: 'setting',
  state: settings,
  reducers: {
    getSetting(state) {
      const setting: any = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach((key) => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      return {
        ...state,
        ...setting
      };
    }
  }
};

export default SettingModel;
