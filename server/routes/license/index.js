const createOne = require('./createOne');
const updateOne = require('./updateOne');
const getOne = require('./getOne');
const deleteOne = require('./deleteOne');

function license(service, router) {
  router.post('/license/create', createOne(service));
  router.post('/license/read', updateOne(service));
  router.post('/license/update', getOne(service));
  router.post('/license/delete', deleteOne(service));
  return router;
}
module.exports = license;