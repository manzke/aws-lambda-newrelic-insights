var superagent = require('superagent');

var baseURL = 'https://insights-collector.newrelic.com/v1/accounts/';
var endpoint = '/events';
var authHeader = 'X-Insert-Key';

function constructURL(accountId) {
    return baseURL + accountId + endpoint;
}

console.log('Loading function insights-pusher.js');

exports.handler = function(event, context) {
    event.Records.forEach(function(record, index, array) {
        // Kinesis data is base64 encoded so decode here
        var event = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', event);
        event = JSON.parse(event);
        
        var apiKey = event.apiKey;
        var accountId = event.accountId;
        var insightEvent = event.item;
        
        console.log('apiKey = ' + apiKey);
        console.log('accountId = ' + accountId);
        console.log('insightEvent = ' + insightEvent);

        var insightsURL = constructURL(accountId);
        console.log('insightsURL = ' + insightsURL);
    
        superagent.post(insightsURL)
                .set(authHeader, apiKey)
                .send(insightEvent)
                .end(function(error, response) {
                        console.log(error);
                        if (response.ok) {
                            //foreach is synchronous so the last event should only succeed
                            if (index === array.length - 1) {
                                context.succeed(response);
                            }
                        } else {
                            //fail fast
                            context.fail(error);
                        }
                    });
    });
};
