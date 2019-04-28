let list = [
  { id: 1, module: 'permission', name: 'actionCreate', type: 1, remark: '权限模块创建操作权限' },
  { id: 2, module: 'permission', name: 'actionUpdate', type: 1, remark: '权限模块修改操作权限' },
  { id: 3, module: 'permission', name: 'actionRemove', type: 1, remark: '权限模块删除操作权限' },
  { id: 4, module: 'permission', name: 'actionQueryList', type: 1, remark: '权限模块分页查询操作权限' },
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
