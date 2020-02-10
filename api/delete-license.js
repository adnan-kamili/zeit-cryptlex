const CryptlexApi = require('../_utils/CryptlexApi');

module.exports = (req, res) => {
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