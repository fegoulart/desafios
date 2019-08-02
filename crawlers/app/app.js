'use strict';

let thread = require('./controller').thread;
let telegram = require('./controller').telegram;
let config = require('./config');

const {
    setIntervalAsync
} = require('set-interval-async/dynamic');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


readline.question(`Choose your subreddits (separated by ;) :`, (subreddits) => {
    const cancelableTimeout = thread.makeTimeout(config().timeout);

    Promise.race([thread.getThreads(subreddits), cancelableTimeout])

    //return new thread.getThreads(subreddits)
        .then(function (threadsArray) {
            cancelableTimeout.cancel();
            threadsArray.forEach(function (item) {
                console.log(item.score + " - " + item.subreddit + " - " + item.title + " - " + item.threadLink + " - " + item.commentsLink);
            });
            readline.close()
        }, function (errorData) {
            console.log(errorData);
            readline.close()
        })
        .catch(err => {
            throw ('Could not get threads: ' + err)
        })

});

return setIntervalAsync(
    () => {
        const cancelableTimeout = thread.makeTimeout(config().timeout);
        Promise.race([telegram.checkGoulartBot(), cancelableTimeout]).then(
            () => {
                if (process.env.DEBUG === "messaging-api-telegram") {
                    let today = new Date();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                    console.log('CheckGoulartBot answer: ' + time.toString())
                }
            })
    },
    1000
);
