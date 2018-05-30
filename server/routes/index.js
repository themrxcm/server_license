const license = require('./license');
const licensing = require('./licensing');

module.exports = function upGradedRouter(services, router) {
  license(services.licenseService, router);
  licensing(services.licensingService, router);
};
