# Example Implementation – Stream, AWS SQS, Lambda, and SNS

To use this repo, you'll first want to read the tutorial: https://getstream.io/blog/using-the-stream-real-time-firehose-with-aws-sqs-lambda-and-sns.

## Environment Variables
AWS_ENVIRONMENT=development<br/>
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID<br/>
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY<br/>
AWS_ROLE_ARN=YOUR_AWS_ROLE_ARN<br/>
AWS_SNS_TOPIC_ARN=YOUR_AWS_SNS_TOPIC_ARN<br/>
AWS_REGION=us-east-1<br/>
AWS_FUNCTION_NAME=STREAM<br/>
AWS_HANDLER=index.handler<br/>
AWS_MEMORY_SIZE=128<br/>
AWS_TIMEOUT=30<br/>
AWS_RUNTIME=nodejs8.10<br/>
EXCLUDE_GLOBS="event.json"<br/>
PACKAGE_DIRECTORY=build

## Testing

To test locally, you will first need to install `node-lambda` globally. You can use `npm` or `yarn` (totally up to you). For example, you can install globally using the command `yarn global add node-lambda`.

If you'd like to sumulate what Stream sends, comment out the existing `payload` variable and copy/paste the following into your file:

```
const payload = {
    actor: '1',
    verb: 'tweet',
    object: '1',
    target: null,
    time: '2016-12-15T17:20:37.258',
    foreign_id: null,
    id: 'af781804-847e-11e4-8080-80012fb97b9e',
    tweet: 'Hello world'
};
```

You can then run the command `yarn dry-run` to simulate the lambda function.

## Production

To run this on AWS, use the command `yarn deploy` to deploy your Lambda function.

> Note: In order for this to operate properly in an AWS environment, you must hardcode the `TopicArn`. For example, `process.env.AWS_SNS_TOPIC_ARN` would become `arn:aws:sns:us-east-1:365397945985:STREAM`.
