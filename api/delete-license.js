const CryptlexApi = require('./_utils/CryptlexApi');
const config = require('./_utils/config.js');

const productId = config.productId;

module.exports = async (req, res) => {
    let event = req.body;

    switch (event.type) {
        case 'customer.subscription.updated':
            break;
        default:
            return res.json({ event: event.type });
    }
    const subscription = event.data.object;

    if (subscription.status == 'canceled') {
        await CryptlexApi.deleteLicense(productId, 'customer_id', subscription.customer);
        res.json({ message: "License deleted!" });
    } else {
        res.json({ subscriptionStatus: subscription.status });
    }
}