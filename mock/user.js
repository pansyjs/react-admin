function getCurrentUser(req, res) {
  const { token } = req.headers;
  // token不存在
  if (!token) {
    res.json({
      status: 50008,
      data: {},
      message: '非法的token'
    });
    res.status(200).end();
    return;
  }
  const role = token.split('_')[0];
  // 管理员
  if (role === 'admin') {
    res.json({
      status: 200,
      data: {
        id: 'a81n02nw43qp4wq112',
        username: 'admin',
        role: {

        }
      },
      message: 'success'
    });
    res.status(200).end();
    return;
  }

  // 普通用户
  if (role === 'user') {
    res.json({
      status: 200,
      data: {
        id: 'a81n02nw43qp4wq112',
        username: 'admin',
        role: {

        }
      },
      message: 'success'
    });
    res.status(200).end()
  } else {
    res.json({
      status: 50008,
      data: {},
      message: '非法的token'
    });
    res.status(200).end();
  }
}

function login(req, res) {
  const { username } = req.body;
  if (username === 'admin' || username === 'user') {
    res.json({
      status: 200,
      data: {
        token: `${username}_token`
      },
      message: 'success'
    });
    res.status(200).end();
  } else {
    res.json({
      status: 10401,
      data: {
        token: ''
      },
      message: '用户不存在'
    });
    res.status(401).end();
  }
}

export default {
  'GET /api/user/current': getCurrentUser,
  'POST /api/user/login': login
};
