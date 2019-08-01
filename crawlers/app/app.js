'use strict';

let config = require('./config.js');
let utils = require('./utils.js');
let thread = require('./controller').thread;
let telegram = require('./controller').telegram;

let threadsArray = []
let pageUrl = config().baseUrl
let infiniteIterations = Number.MAX_SAFE_INTEGER;
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


//https://github.com/danielqejo/desafiosIdWall/blob/master/crawlers/RedditCrawler/src/main/java/idwall/desafio/redditcrawler/telegram/bots/DanielIdWallBot.java


readline.question(`Choose your subreddits (separated by ;) :`, (subreddits) => {

    let getData = new thread.getThreads(subreddits)
        .then(function (threadsArray) {
            threadsArray.forEach(function (item, index) {
                console.log(item.score + " - " + item.subreddit + " - " + item.title + " - " + item.threadLink + " - " + item.commentsLink);
            })
            readline.close()
        }, function (errorData) {
            console.log(errorData);
            readline.close()
        })

});

const timer = setIntervalAsync(
    () => {
        console.log('Hello')
        return new telegram.checkGoulartBot().then(
            () =>
                console.log('Bye')
        )
    },
    1000
)
