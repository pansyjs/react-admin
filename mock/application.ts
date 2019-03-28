import Mock from 'mockjs';

const List = [];

for (let i = 0; i < 8; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@ctitle',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'
  }));
}

function getList(req, res) {

  res.json({
    data: List,
    status: 200,
    message: 'success'
  });
  res.status(200).end();
}

export default {
  'GET /application/list': getList
};
