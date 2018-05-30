module.exports = function(dbLicense) {
  return function updateOne(licenseData, licenseKey) {
    return dbLicense.insert(licenseData, licenseKey, function(error, body) {
      if (error) {
        return ({status: false, error: error});
      }
      return ({status: true, data: body})
    })
  }
};