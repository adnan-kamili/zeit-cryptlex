const uuidv4 = require('uuid/v4');
const CryptlexApi = require('./_utils/CryptlexApi');
const { MailgunService } = require('./_utils/MailgunService');

module.exports = async (req, res) => {
    let event = req.body;

    switch (event.type) {
        case 'customer.created':
            break;
        default:
            return res.json({ event : event.type});
    }

    // get post params from request body
    const customer = event.data.object;
    const email = customer.email;
    let firstName = 'John', lastName = '_';
    if (customer.name) {
        const nameParts = customer.name.split(' ');
        firstName = nameParts[0];
        if (nameParts.length > 1) {
            lastName = nameParts[1];
        }
    }
    const customerId = customer.id;

    // create license user
    const userBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: uuidv4(),
        role: 'user'
    };
    const user = await CryptlexApi.createUser(userBody);

    // create license
    const licenseBody = {
        productId: productId,
        userId: user.id,
        metadata: []
    };
    licenseBody.metadata.push({ key: 'customer_id', value: customerId, visible: false });
    // licenseBody.metadata.push({ key: 'subscription_id', value: subscriptionId, visible: false });s
    const license = await CryptlexApi.createLicense(licenseBody);
    const templateData = {
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        email: userBody.email,
        password: userBody.password,
        licenseKey: license.key
    };
    await MailgunService.sendOrderEmail(email, templateData);

    console.log("License created successfully!");
    res.json({ key: license.key });
}