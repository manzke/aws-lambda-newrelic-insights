var superagent = require('superagent');
var pusher = require('insights-pusher');

console.log('Loading function insights-pusher-lambda.js');

exports.handler = function(event, context) {
    pusher.push(function(error) {
                    context.fail(error);
                },
                function(response) {
                    context.succeed(response);
                },
                event, context
    );
};
