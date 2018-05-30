const licenseService = require('./licenseService');
const licensingService = require('./licensingService');

module.exports = function(api) {
  const {apiDB} = api;
  return {
    licenseService: licenseService(apiDB),
    licensingService: licensingService(apiDB),
  };
};