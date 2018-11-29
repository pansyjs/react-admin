import defaultSettings from '@/defaultSettings';

export default {
  name: 'setting',

  state: defaultSettings,

  reducers: {
    getSetting(state) {},
    changeSetting(state, { payload }) {}
  }
};
