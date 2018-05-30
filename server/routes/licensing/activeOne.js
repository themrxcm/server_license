function activeOne(licensingService) {
  return async function(req, res) {
    const params = {
      licenseKey: req.body.licenseKey,
      baseboardSerial: req.body.baseboardSerial,
      baseboardName: req.body.baseboardName,
      systemUUID: req.body.systemUUID,
      biosVersion: req.body.biosVersion,
    };
    const data = await licensingService.activeOne(params);
    res.json(data)
  };
}

module.exports = activeOne;