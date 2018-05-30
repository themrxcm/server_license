const activeOne = require('./activeOne');
const checkOne = require('./checkOne');

function licensing(service, router) {
  router.post('/licensing/active', activeOne(service));
  router.post('/licensing/check', checkOne(service));
  return router;
}

module.exports = licensing;