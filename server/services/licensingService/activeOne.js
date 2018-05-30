let licenseKeyGen = require('license-key-gen');

async function getLicense(licenseKey, apiLicense) {
  return await apiLicense.getOne(licenseKey)
}

async function writeLicense(licenseData, apiLicense) {
  return await apiLicense.createOne(licenseData)
}

async function updateLicense(licenseData, licenseKey, apiLicense) {
  return await apiLicense.updateOne(licenseData, licenseKey)
}

module.exports = function(apiDB) {
  return async function activeOne({licenseKey, baseboardSerial, baseboardName, systemUUID, biosVersion}) {
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

  if (license.data.status === 'no-active') {
    return await activationLic(license, licenseInfo, apiLicense);
  } else if (license.data.status === 'active') {
    return await checkedActiveLic(license, licenseInfo, apiLicense);
  }
}

async function activationLic(license, licenseInfo, apiLicense) {
  licenseInfo.licenseKey = license.data.licenseKey;
  let createdKey = await createLicenseKey(licenseInfo)
    .then(function(licenseData) {
      return licenseData;
    }).catch(function(err) {
      console.log(err);
      return err;
    });

  if (!createdKey.status) return createdKey;
  let licenseData = {_id: createdKey.license, licenseKey: createdKey.license};
  let writedLicense = await writeLicense(licenseData, apiLicense);
  writedLicense = JSON.parse(writedLicense.body);

  if (!writedLicense.licenseKey) {
    return writedLicense
  } else {
    return await updateLic(license, writedLicense, apiLicense)
  }
}

async function createLicenseKey(info) {
  return new Promise(function(resolve, reject) {
    let licenseData = {info: info, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8'};
    try {
      let license = licenseKeyGen.createLicense(licenseData);
      resolve({status: true, license: license.license, licInfo: info})
    } catch (err) {
      reject({status: false, error: err})
    }
  });
}

async function updateLic(license, writedLicense, apiLicense) {
  license.data.status = 'active';
  license.data.childrenKey = writedLicense._id;
  let updatedLic = await updateLicense(license.data, license.data.licenseKey, apiLicense);
  updatedLic = JSON.parse(updatedLic.body);
  if (!updatedLic.licenseKey) {
    return updatedLic
  }
  return updatedLic
}

async function checkedActiveLic(license, licenseInfo, apiLicense) {
  licenseInfo.licenseKey = license.data.licenseKey;
  let licenseKey = await getLicense(license.data.childrenKey, apiLicense);
  if (!licenseKey.status) {
    return licenseKey
  }
  let licenseData = {info: licenseInfo, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8'};

  try {
    licenseKeyGen.validateLicense(licenseData, licenseKey.data.licenseKey);
    return ({data: license.data, status: true})
  } catch (err) {
    return ({error: err.message, status: false})
  }
}