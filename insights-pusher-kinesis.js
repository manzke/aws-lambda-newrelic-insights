var superagent = require('superagent');
var pusher = require('insights-pusher');

console.log('Loading function insights-pusher-kinesis.js');

exports.handler = function(event, context) {
    event.Records.forEach(function(record, index, array) {
        // Kinesis data is base64 encoded so decode here
        var event = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', event);
        event = JSON.parse(event);
        
        pusher.push(function(error) {
                        //fail fast
                        context.fail(error);
                    },
                    function(response) {
                        //foreach is synchronous so the last event should only succeed
                        if (index === array.length - 1) {
                            context.succeed(response);
                        }
                    },
                    event, context
        );
    });
};