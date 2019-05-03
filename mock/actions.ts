let list = [
  { id: 1, module: 'dashboard', name: 'analysis', type: 1, remark: 'dashboard1' },
  { id: 2, module: 'dashboard', name: 'workplace', type: 1, remark: 'dashboard2' },
  { id: 3, module: 'permission', name: 'actionCreate', type: 1, remark: '权限模块创建操作权限' },
  { id: 4, module: 'permission', name: 'actionUpdate', type: 1, remark: '权限模块修改操作权限' },
  { id: 5, module: 'permission', name: 'actionRemove', type: 1, remark: '权限模块删除操作权限' },
  { id: 6, module: 'permission', name: 'actionList', type: 1, remark: '权限模块查询列表权限' },
  { id: 7, module: 'permission', name: 'policyCreate', type: 1, remark: '权限策略创建操作权限' },
  { id: 8, module: 'permission', name: 'policyUpdate', type: 1, remark: '权限策略修改操作权限' },
  { id: 9, module: 'permission', name: 'policyRemove', type: 1, remark: '权限策略删除操作权限' },
  { id: 10, module: 'permission', name: 'policyList', type: 1, remark: '权限策略查询列表权限' },
];

function getModules(req, res) {
  res.send({
    code: 200,
    data: [
      { id: 1, name: 'exception' },
      { id: 2, name: 'order' },
      { id: 3, name: 'system' },
      { id: 4, name: 'permission' }
    ],
    message: 'success'
  });
}

function getActions(req, res) {
  res.send({
    code: 200,
    data: list,
    message: 'success'
  });
}

function removeAction(req, res) {
  const { id } = req.body;

  list = list.filter(item => item.id !== id);

  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

export default {
  'GET /api/actions/modules': getModules,
  'GET /api/actions/list': getActions,
  'DELETE /api/actions/remove': removeAction
};
