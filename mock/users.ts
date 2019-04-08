function fetchCurrent(req, res) {
  console.log(req.headers);
  res.send({
    code: 200,
    data: {
      name: '系统管理员',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      unreadCount: 11,
      email: 'wang_xingkang@qq.com'
    },
    message: 'success'
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
  'GET /api/users/current': fetchCurrent,
  'GET /api/users/logout': fetchLogout
};
