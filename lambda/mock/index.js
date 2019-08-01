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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  const modules = [{ id: 1, name: 'dashboard' }, { id: 2, name: 'permission' }];

  let actions = [
    { moduleId: 1, name: 'analysis', displayName: 'Analysis', type: 1, remark: 'dashboard1' },
    { moduleId: 1, name: 'workplace', displayName: 'Workplace', type: 1, remark: 'dashboard2' },
    {
      moduleId: 2,
      name: 'actionCreate',
      displayName: '创建操作API',
      type: 1,
      remark: '权限模块创建操作权限',
    },
    {
      moduleId: 2,
      name: 'actionUpdate',
      displayName: '更新操作API',
      type: 1,
      remark: '权限模块修改操作权限',
    },
    {
      moduleId: 2,
      name: 'actionRemove',
      displayName: '删除操作API',
      type: 1,
      remark: '权限模块删除操作权限',
    },
    {
      moduleId: 2,
      name: 'actionList',
      displayName: '操作列表API',
      type: 1,
      remark: '权限模块查询列表权限',
    },
    {
      moduleId: 2,
      name: 'policyCreate',
      displayName: '权限策略创建API',
      type: 1,
      remark: '权限策略创建操作权限',
    },
    {
      moduleId: 2,
      name: 'policyUpdate',
      displayName: '权限策略修改API',
      type: 1,
      remark: '权限策略修改操作权限',
    },
    {
      moduleId: 2,
      name: 'policyRemove',
      displayName: '权限策略删除API',
      type: 1,
      remark: '权限策略删除操作权限',
    },
    {
      moduleId: 2,
      name: 'policyList',
      displayName: '权限策略列表API',
      type: 1,
      remark: '权限策略查询列表权限',
    },
  ];

  function getModule(moduleId) {
    let module;

    for (let i = 0, len = modules.length; i < len; i++) {
      if (modules[i].id === moduleId) {
        module = modules[i];
      }
    }

    return module;
  }

  var server_action = {
    'GET /api/actions/list': (req, res) => {
      return actions.map(item => {
        const action = { ...item };
        action['module'] = getModule(action.moduleId);

        delete action.moduleId;

        return action;
      });
    },
  };

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
      const { password, username, type } = req.body;

      if (password === '123456' && username === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
        });
        return;
      }

      if (password === 'user' && username === '123456') {
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

  return _objectSpread({}, api, server_action);
});
