(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('mockjs'), require('moment')))
    : typeof define === 'function' && define.amd
    ? define(['mockjs', 'moment'], factory)
    : (global = global || self)((global.mock = factory(global.mockjs, global.moment)));
})(this, function(mockjs, moment) {
  'use strict';

  mockjs = mockjs && mockjs.hasOwnProperty('default') ? mockjs['default'] : mockjs;
  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }),
        );
      }

      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var api = {
    'GET /api/users/current': (req, res) => {
      res.send({
        code: 200,
        data: {
          name: '系统管理员',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          unreadCount: 11,
          email: 'wang_xingkang@qq.com',
          policies: [
            {
              version: 1,
              statement: [
                {
                  effect: 'allow',
                  action: ['permission/*', 'dashboard/analysis'],
                },
              ],
            },
          ],
        },
        message: 'success',
      });
    },
    'POST /api/users/login': (req, res) => {
      const { password, userName, type } = req.body;

      if (password === '123456' && userName === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
        });
        return;
      }

      if (password === 'user' && userName === '123456') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'user',
        });
        return;
      }

      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
      });
    },
  };

  return _objectSpread({}, api);
});
