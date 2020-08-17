// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('config.json');

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

function sendEmail(to, subject = '', body = '') {
	// send to list
	// var to = ['guest@gmail.com']

	// this must relate to a verified SES account
	var from = 'test@gmail.com'

	// this sends the email
	// @todo - add HTML version
	ses.sendEmail(
		{
			Source: from,
			Destination: { ToAddresses: to },
			Message: {
				Subject: {
					Data: subject,
				},
				Body: {
					Text: {
						Data: body,
					}
				}
			}
		}
		, function (err, data) {
			if (err) throw err
			console.log('Email sent:');
			console.log(data);
		});
}

module.exports = sendEmail;