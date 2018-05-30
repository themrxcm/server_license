module.exports = function(dbLicense) {
  return function createOne(licenseData) {
    return dbLicense.insert(licenseData, '', function(error, body) {
      if (error) {
        return ({status: false, error: error});
      }
      return ({status: true, data: body})
    })
  }
};
