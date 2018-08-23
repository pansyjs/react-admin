export default {
  'GET /api/login': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
}
