import { mock, Random } from 'mockjs';

const Users = [];
const count = 100;

for (let i = 0; i < count; i++) {
  Users.push(mock({
    id: '@guid',
    username: '@first',
    email: '@email',
    mobile: '17710067606',
    remark: '@cparagraph(1)',
    createTime: +Random.date('T'),
  }))
}

function fetchCurrent(req, res) {
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
              action: [
                'permission/*',
                'dashboard/analysis'
              ]
            }
          ]
        }
      ]
    },
    message: 'success'
  });
}

function fetchList(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const pageList = Users.filter((item, index) => {
    return index < limit * page && index >= limit * (page - 1)
  });

  res.send({
    code: 200,
    message: 'success',
    data: {
      list: pageList,
      total: Users.length
    }
  });
}

// 用户登录
function fetchLogin(req, res) {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    res.send({
      code: 200,
      message: 'success',
      data: {
        token: 'admin_token'
      }
    });
    return;
  }
  if ( username === 'user'  && password === '123456') {
    res.send({
      code: 200,
      message: 'success',
      data: {
        token: 'user_token'
      }
    });
    return;
  }
  // 用户名或者密码错误
  res.send({
    code: 10001,
    message: '账号或密码错误',
    data: {}
  });
}

function fetchLogout(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

export default {
  'POST /api/users/login': fetchLogin,
  'GET /api/users/list': fetchList,
  'GET /api/users/current': fetchCurrent,
  'GET /api/users/logout': fetchLogout
};
