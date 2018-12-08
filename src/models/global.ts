export default {
  name: 'global',

  state: {
    collapsed: false,
    notices: []
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    }
  }
};
