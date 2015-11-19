# aws-lambda-newrelic-insights
push custom events to newrelic insights through aws lambda

tests/records.json can be used as a test event simulating a kinesis event when insights-pusher-kinesis.js is used. the real data is base64 encoded.
tests/events.json is one specific event which can be used with insights-pusher-lambda.js
