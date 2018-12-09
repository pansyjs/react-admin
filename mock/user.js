function getCurrentUser(req, res) {
  res.json({
    status: 200,
    data: {
      name: 'Tom',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      unreadCount: 11
    },
    message: 'success'
  });
  res.status(200).end();
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
