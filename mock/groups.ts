import { mock, Random } from 'mockjs';

let Groups = [];
const count = 100;

for (let i = 0; i < count; i++) {
  Groups.push(mock({
    id: '@guid',
    name: '@first',
    userNumber: 10,
    remark: '@cparagraph(1)',
    createTime: +Random.date('T'),
  }))
}

function fetchList(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const pageList = Groups.filter((item, index) => {
    return index < limit * page && index >= limit * (page - 1)
  });

  res.send({
    code: 200,
    message: 'success',
    data: {
      list: pageList,
      total: Groups.length
    }
  });
}

export default {
  'GET /api/groups/list': fetchList,
};
