const createOne = require('./createOne');
const getOne = require('./getOne');
const updateOne = require('./updateOne');
const deleteOne = require('./deleteOne');

module.exports = async function(dbConnect) {

  dbConnect.db.create('license', function(err) {
    if (!err) {
      console.log('Базы данныйх для лицензий создана!');
    } else {
      console.log(err.reason);
    }
  });
  let dbLicense = dbConnect.use('license');
  return {
    createOne: createOne(dbLicense),
    getOne: getOne(dbLicense),
    updateOne: updateOne(dbLicense),
    deleteOne: deleteOne(dbLicense),
  };
};
