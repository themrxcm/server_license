function deleteOne(licenseService) {
  return async function(req, res) {
    const params = {
      start: req.body.start,
      end: req.body.end,
      email: req.body.email,
      company: req.body.company,
    };
    const data = await licenseService.deleteOne(params);
    res.json(data)
  };
}

module.exports = deleteOne;