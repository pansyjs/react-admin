function getCurrentUser(req, res) {
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
}

function login(req, res) {
  res.json({
    status: 200,
    data: {
      token: 'ui79sa2md4ka02da'
    },
    message: 'success'
  });
  res.status(200).end()
}

export default {
  'GET /api/currentUser': getCurrentUser
};

export default {
  'POST /api/user/login': login
};
