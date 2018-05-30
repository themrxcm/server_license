const apiDB = require('./apiDB');

module.exports = function(dbConnect) {
  return {
    apiDB: apiDB(dbConnect),
  };
};
