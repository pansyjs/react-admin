function getModules(req, res) {
  res.send({
    code: 200,
    data: [
      { id: 1, name: '模块1' },
      { id: 2, name: '模块2' },
      { id: 3, name: '模块3' },
      { id: 4, name: '模块4' },
      { id: 5, name: '模块5' }
    ],
    message: 'success'
  });
}

export default {
  'GET /api/actions/modules': getModules
};
