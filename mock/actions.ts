const modules = [
  { id: 1, name: 'dashboard' },
  { id: 2, name: 'permission' }
];

let actions = [
  { id: 1, moduleId: 1, name: 'analysis', type: 1, remark: 'dashboard1' },
  { id: 2, moduleId: 1, name: 'workplace', type: 1, remark: 'dashboard2' },
  { id: 3, moduleId: 2, name: 'actionCreate', type: 1, remark: '权限模块创建操作权限' },
  { id: 4, moduleId: 2, name: 'actionUpdate', type: 1, remark: '权限模块修改操作权限' },
  { id: 5, moduleId: 2, name: 'actionRemove', type: 1, remark: '权限模块删除操作权限' },
  { id: 6, moduleId: 2, name: 'actionList', type: 1, remark: '权限模块查询列表权限' },
  { id: 7, moduleId: 2, name: 'policyCreate', type: 1, remark: '权限策略创建操作权限' },
  { id: 8, moduleId: 2, name: 'policyUpdate', type: 1, remark: '权限策略修改操作权限' },
  { id: 9, moduleId: 2, name: 'policyRemove', type: 1, remark: '权限策略删除操作权限' },
  { id: 10, moduleId: 2, name: 'policyList', type: 1, remark: '权限策略查询列表权限' },
];

function getActions() {
  return actions.map((item) => {
    const action = { ...item };
    action['module'] = getModule(action.moduleId);

    delete action.moduleId;

    return action;
  });
}

function getModule(moduleId) {
  let module;

  for (let i = 0, len = modules.length; i < len; i++) {
    if (modules[i].id === moduleId) {
      module = modules[i];
    }
  }

  return module;
}

function fetchGetModules(req, res) {
  res.send({
    code: 200,
    data: modules,
    message: 'success'
  });
}

function fetchGetActions(req, res) {
  const { moduleId } = req.query;

  let list = getActions();

  if (moduleId) {
    list = list.filter((item) => item['module'].id === Number(moduleId))
  }

  res.send({
    code: 200,
    data: list,
    message: 'success'
  });
}

function fetchUpdateAction(req, res) {
  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

function fetchRemoveAction(req, res) {
  const { id } = req.body;

  actions = actions.filter(item => item.id !== id);

  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

export default {
  'GET /api/actions/modules': fetchGetModules,
  'GET /api/actions/list': fetchGetActions,
  'PUT /api/actions/update': fetchUpdateAction,
  'DELETE /api/actions/remove': fetchRemoveAction
};
