function getCurrent(req, res) {
  res.json({
    status: 200,
    data: {
      name: 'Tom',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      unreadCount: 11,
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        { key: '0', label: '很有想法的' },
        { key: '1', label: '专注设计' },
        { key: '2', label: '辣~' },
        { key: '3', label: '大长腿' },
        { key: '4', label: '川妹子' },
        { key: '5', label: '海纳百川' },
      ],
    },
    message: 'success'
  });
  res.status(200).end();
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

function logout(req, res) {
  res.json({
    code: 200,
    message: 'success'
  });
  res.status(200).end();
}

export default {
  'POST /api/users/login': fetchLogin,
  'GET /api/users/current': getCurrent,
  'GET /api/users/logout': logout
};
