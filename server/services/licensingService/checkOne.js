let licenseKeyCheck = require('license-key-gen');

async function getLicense(licenseKey, apiLicense) {
  return await apiLicense.getOne(licenseKey)
}

module.exports = function(apiDB) {
  return async function checkOne({licenseKey, baseboardSerial, baseboardName, systemUUID, biosVersion}) {
    return await firstFunction(licenseKey, baseboardSerial, baseboardName, systemUUID, biosVersion, apiDB)
  }
};

async function firstFunction(licenseKey, baseboardSerial, baseboardName, systemUUID, biosVersion, apiDB) {
  let apiLicense = await apiDB.license;
  let license = await getLicense(licenseKey, apiLicense);
  if (!license.status) {
    return license
  }

  let licenseInfo = {
    baseboardSerial,
    baseboardName,
    systemUUID,
    biosVersion
  };

  if (license.data.status === 'expired') {
    license.data.statusTest = 'License expired!';
    return license
  } else if (license.data.status === 'active' &&
    baseboardSerial &&
    baseboardName &&
    systemUUID &&
    biosVersion) {
    return await checkedActiveLic(license, licenseInfo, apiLicense);
  } else if (license.data.status === 'no-active') {
    return license
  }
  return license
}

async function checkedActiveLic(license, licenseInfo, apiLicense) {
  licenseInfo.licenseKey = license.data.licenseKey;
  let licenseKey = await getLicense(license.data.childrenKey, apiLicense);
  if (!licenseKey.status) {
    return licenseKey
  }

  let licenseData = {info: licenseInfo, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8'};

  try {
    licenseKeyCheck.validateLicense(licenseData, licenseKey.data.licenseKey);
    return ({data: license.data, status: true})
  } catch (err) {
    return ({error: err.message, status: false})
  }
}