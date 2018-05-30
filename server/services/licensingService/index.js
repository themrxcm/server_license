const checkOne = require('./checkOne');
const activeOne = require('./activeOne');

module.exports = function(apiDB) {
  return {
    checkOne: checkOne(apiDB),
    activeOne: activeOne(apiDB)
  };
};