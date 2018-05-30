const createOne = require('./createOne');
const updateOne = require('./updateOne');
const getOne = require('./getOne');
const deleteOne = require('./deleteOne');

module.exports = function(apiDB) {
  return {
    createOne: createOne(apiDB),
    // updateOne: updateOne(apiDB),
    // getOne: getOne(apiDB),
    // deleteOne: deleteOne(apiDB),
  };
};
