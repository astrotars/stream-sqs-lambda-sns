// Dependencies
const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const moment = require('moment');

// Setup promises
AWS.config.setPromisesDependency(null);

exports.handler = async (event, context, callback) => {
	// Parse incoming event payload
	const payload = JSON.parse(event.Records[0].body)[0].new[0];

	// const payload = {
	// 	actor: '1',
	// 	verb: 'tweet',
	// 	object: '1',
	// 	target: null,
	// 	time: '2016-12-15T17:20:37.258',
	// 	foreign_id: null,
	// 	id: 'af781804-847e-11e4-8080-80012fb97b9e',
	// 	tweet: 'Hello world',
	// };

	// This should be your database
	const cache = {
		actors: ['Nick'],
		verbs: {
			tweet: 'tweeted',
		},
	};

	const actor = cache.actors[0]; // Hardcoding user, should be a database lookup
	const verb = cache.verbs[payload.verb]; // Hardcoding verb (should be a ternary or if/else statement)
	const tweet = payload.tweet; // The example always contains a tweet
	const time = moment(payload.time).format('MMMM Do YYYY [at] h:mm:ss A'); // Time is ISO-8601 formatted

	// Build params
	const params = {
		Message: `${actor} ${verb} "${tweet}" on ${time}`,
		TopicArn: process.env.AWS_SNS_TOPIC_ARN,
	};

	// Send a SMS via AWS SNS
	sns.publish(params, (err, data) => {
		if (err) {
			return callback(err.stack);
		} else {
			callback(null, data);
		}
	});
};
