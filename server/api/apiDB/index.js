const license = require('./license');

module.exports = function(dbConnect) {
  return {
    license: license(dbConnect),
  };
};
