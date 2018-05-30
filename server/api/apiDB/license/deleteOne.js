module.exports = function(dbLicense) {
  return function(licInfo) {
    return new Promise(function(resolve, reject) {
      resolve(true)
    })
  }
};