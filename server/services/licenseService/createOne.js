let licenseKey = require('license-key-gen');

async function writeLicense(licenseData, apiLicense) {
  return await apiLicense.createOne(licenseData)
}

module.exports = function(apiDB) {
  return async function createOne({start, end, email, company}) {
    return await firstFunction(start, end, email, company, apiDB)
  }
};

async function firstFunction(start, end, email, company, apiDB) {
  let apiLicense = await apiDB.license;
  let licInfo = {
    start: start,
    end: end,
    email: email,
    company: company,
    status: 'no-active',
    childrenKey: '',
  };

  let createdKey = await createLicenseKey(licInfo)
    .then(function(licenseData) {
      return licenseData;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  let licenseData = createdKey.licInfo;
  licenseData._id = createdKey.license;
  licenseData.licenseKey = createdKey.license;
  let writedLicense = await writeLicense(licenseData, apiLicense);
  return writedLicense.body;

}

async function createLicenseKey(info) {
  return new Promise(function(resolve, reject) {
    let licenseData = {info: info, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8'};
    try {
      let license = licenseKey.createLicense(licenseData);
      resolve({status: true, license: license.license, licInfo: info})
    } catch (err) {
      reject({status: false, error: err})
    }
  })
}