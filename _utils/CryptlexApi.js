const HttpClient = require('./HttpClient');
const { accessToken, apiBaseUrl } = require('./config')

const httpClient = new HttpClient(accessToken);

class CryptlexApi {
    static async createUser(body) {
        const url = `${apiBaseUrl}/users`;
        // check whether user exists
        console.log("fetching existing user...");
        let users = await httpClient.get(`${url}?email=${body.email}`);
        if (users.length) {
            console.log("user already exists!")
            return users[0];
        }
        console.log("user not found, creating new user...")
        // create a new user
        const user = await httpClient.post(url, body);
        return user;
    }

    static async createLicense(body) {
        console.log("creating license...");
        const url = `${apiBaseUrl}/licenses`;
        const license = await httpClient.post(url, body);
        return license;
    }

    static async renewLicense(productId, metadataKey, metadataValue) {
        const url = `${apiBaseUrl}/licenses`;
        // get the license
        console.log("fetching existing license...");
        let licenses = await httpClient.get(`${url}?productId=${productId}&metadataKey=${metadataKey}&metadataValue=${metadataValue}`);
        if (!licenses.length) {
            throw Error("License does not exist!");
        }
        const license = licenses[0];
        console.log("renewing existing license...");
        const expiryDate = new Date(license.expiresAt).getTime() / 1000;
        const now = new Date().getTime() / 1000;
        if ((expiryDate - now) / 86400 > 20) {
            return license;
        }
        const renewedLicense = await httpClient.post(`${url}/${license.id}/renew`);
        return renewedLicense;
    }

    static async revokeLicense(productId, metadataKey, metadataValue) {
        const url = `${apiBaseUrl}/licenses`;
        // get the license
        console.log("fetching existing license...");
        let licenses = await httpClient.get(`${url}?productId=${productId}&metadataKey=${metadataKey}&metadataValue=${metadataValue}`);
        if (!licenses.length) {
            throw Error("License does not exist!");
        }
        const license = licenses[0];
        console.log("revoking license...");
        const revokedLicense = await httpClient.patch(`${url}/${license.id}`, { revoked: true });
        return revokedLicense;
    }
}
module.exports = CryptlexApi;