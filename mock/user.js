function getCurrentUser(req, res) {
  res.json({
    status: 200,
    data: {
      id: 'a81n02nw43qp4wq112',
      username: 'admin'
    },
    message: 'success'
  });
  res.status(200).end()
}

export default {
  'GET /api/currentUser': getCurrentUser
};
