const mailgun = require('mailgun-js');
const config = require('./config.js');

const mailgunClient = mailgun({ apiKey: config.mailgun.apiKey, domain: config.mailgun.domain });

class MailgunService {

	static async sendEmail(data) {
		try {
			await mailgunClient.messages().send(data);
		} catch (error) {
			console.error(error.toString());
		}
	}

	static async sendOrderEmail(toEmail, templateData) {
		var data = {
			from: config.fromEmail,
			to: toEmail,
			subject: 'Purchase order',
			template: config.orderEmailTemplateId,
			'v:firstName': templateData.firstName,
			'v:lastName': templateData.lastName,
			'v:email': templateData.email,
			'v:password': templateData.password,
			'v:licenseKey': templateData.licenseKey
		};
		await MailgunService.sendEmail(data);
	}
}

module.exports = { MailgunService }