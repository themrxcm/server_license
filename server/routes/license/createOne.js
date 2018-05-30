function createOne(licenseService) {
  return async function(req, res) {
    const params = {
      start: req.body.start,
      end: req.body.end,
      email: req.body.email,
      company: req.body.company,
    };
    const data = await licenseService.createOne(params);
    res.json(JSON.parse(data))
  };
}

module.exports = createOne;
