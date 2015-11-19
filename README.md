# aws-lambda-newrelic-insights
push custom events to newrelic insights through aws lambda

tests/records.json can be used as a test event simulating a kinesis event when insights-pusher-kinesis.js is used. the real data is base64 encoded.

tests/events.json is one specific event which can be used with insights-pusher-lambda.js

## installation

1. git clone
2. npm install
3. echo $GIT_COMMIT_HASH
4. zip -r insights-pusher-$GIT_COMMIT_HASH.zip *
5. upload zip to amazon aws lambda
6. configure the lambda Handler (insights-pusher-kinesis.handler or insights-pusher-lambda.handler)

## tests
you can copy the tests/* files to ignore/ and add your credentials. ignore had been added to .gitignore

### test lambda (insights-pusher-lambda.js)
1. modify events.json and add your newrelic accountId and insights apiKey
2. upload to amazon aws lambda as test event

### test kinesis (insights-pusher-kinesis.js)
1. modify events.json and add your newrelic accountId and insights apiKey
2. base64 encode events.json (Online Base64 Encode)[https://www.base64encode.org]
3. copy base64 into records.json under Records.kinesis.data
4. upload to amazon aws lambda as test event

## issues
- if aws lambda tells you that superagent couldn't be found then you haven't read the installation instructions ;) (npm install)
