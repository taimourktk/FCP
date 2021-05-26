const pug = require('pug')
const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')

module.exports = class Email {
	constructor(user, url = '#') {
		this.to = user.email
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.url = url
		this.from = `crowdtestingali@gmail.com`
		this.data = user
	}

	async newTransport() {
		if (process.env.NODE_ENV === 'production' || true) {
			return nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'crowdtestingali@gmail.com',
                    pass: 'alin3211'         
                }
            });
		}
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		})
	}

	async send(template, subject) {
		// 1) Render HTML based on a pug template
		const html = pug.renderFile(
			`${__dirname}/../templates/emails/${template}.pug`,
			{
				firstName: this.firstName,
				lastName: this.lastName,
				url: this.url,
				subject,
				data: this.data
			}
		)

		// 2) Define email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject: subject,
			html,
			text: htmlToText.fromString(html),
		}

		let transport = await this.newTransport()
		await transport.sendMail(mailOptions)
	}

	async sendConfirmation() {
		await this.send('confirm', 'Confirm your email address')
	}

	async sendBugAlert() {
		await this.send('bug', 'Bug Alert')
	}

	async sendFeedbackAlert () {
		await this.send('feedback', 'Feedback Alert');
	}

}