const nodemailer = require('nodemailer');
require('dotenv').config()



module.exports = (req, res) => {
	if (req?.body) {
		const { name, email, message } = req.body

		function newLine(str) {
			return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
		}

		const emailBody = `<strong>${name}</strong> sent you this message:
		<br /><br />
		${newLine(message)}
		<br /><br />
		--- <br />
		Get back to them at <a href="mailto:${email}">${email}</a>`

		const msg = {
			from: 'divysharma029@gmail.com',
			to: 'divy2113035@akgec.ac.in',
			subject: `${name} sent you a message.`,
			html: emailBody
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'divysharma029@gmail.com',
			  pass:process.env.GMAIL_APP_PASSWORD  // Your Gmail app password
			}
		  });

		  
		  transporter.sendMail(msg, (error, info) => {
			if (error) {
				return res.send({ body: req.body, message: error, error: true })
			} else {
				return res.send({ body: req.body, message: 'Success', error: false })
			}
		  });


		
	} else {
		return res.send({ message: 'Only POST stuff here.' })
	}
}
