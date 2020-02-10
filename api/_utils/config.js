module.exports = {
    apiBaseUrl: "https://api.cryptlex.com/v3",
	accessToken: process.env.CRYPTLEX_ACCESS_TOKEN,
	productId: "ad329207-b149-4018-94c2-02e7a48f66b7",
	"fromEmail": "Market Ladder <support@marketladder.com>",
	"orderEmailTemplateId": "order_email_template",
	"mailgun" : {
		"apiKey": process.env.MAILGUN_APIKEY,
		"domain": "mail.marketladder.com"
	}
}
