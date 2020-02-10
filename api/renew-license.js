const CryptlexApi = require('./_utils/CryptlexApi');

module.exports = async (req, res) => {
    let event = req.body;

    switch (event.type) {
        case 'invoice.payment_succeeded':
            break;
        default:
            return res.json({ event : event.type});
    }
    const invoice = event.data.object;

    // renew license expiry
    const license = await CryptlexApi.renewLicense(productId, 'customer_id', invoice.customer);

    // return new expiry date
    res.json({ message: `License new expiry date: ${license.expiresAt}` });
}