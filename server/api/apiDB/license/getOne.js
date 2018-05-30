module.exports = function(dbLicense) {
  return function(licenseKey) {
    return new Promise(function(resolve, reject) {
      return dbLicense.get(licenseKey, function(error, body) {
        if (error) {
          resolve({status: false, error: error.error});
        } else {
          resolve({status: true, data: body})
        }
      })
    })
  }
};