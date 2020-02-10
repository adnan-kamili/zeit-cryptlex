module.exports = {
    apiBaseUrl: "https://api.cryptlex.com/v3",
    accessToken: process.env.CRYPTLEX_ACCESS_TOKEN,
	"fromEmail": "Market Ladder <support@marketladder.com>",
	"orderEmailTemplateId": "order_email_template",
	"mailgun" : {
		"apiKey": process.env.MAILGUN_APIKEY,
		"domain": "mail.marketladder.com"
	}
}
