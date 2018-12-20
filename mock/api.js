import Mock from 'mockjs';

let List = [];

for (let i = 0; i < 8; i++) {
  List.push(Mock.mock({
    id: '@id',
    path: `/api/test/${i}`,
    name: '@ctitle',
    'status|1': [0, 1], // 0 禁用  1 启用
    'type|1': ['POST', 'GET', 'PUT', 'DELETE']
  }));
}

function getList(req, res) {
  res.json({
    data: {
      list: List,
      total: 0
    },
    status: 200,
    message: 'success'
  });
  res.status(200).end();
}

function remove(req, res) {
  const { id } = req.params;
  List = List.filter(item => id !== item.id);
  res.json({
    data: {},
    status: 200,
    message: 'success'
  });
  res.status(200).end();
}

export default {
  'GET /system/api/list': getList,
  'DELETE /system/api/:id': remove
};
