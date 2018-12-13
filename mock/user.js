function getCurrentUser(req, res) {
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

function logout(req, res) {
  res.json({
    status: 200,
    message: 'success'
  });
  res.status(200).end();
}

export default {
  'GET /user/current': getCurrentUser,
  'POST /user/login': login,
  'GET /user/logout': logout
};
