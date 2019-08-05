'use strict';

let phantom = require('phantom');
let cheerio = require('cheerio');
let config = require('../config.js');
let Thread = require('../model/').thread;
let utils = require('../utils');

module.exports = {
    getThreads: getThreads,
    makeTimeout: makeTimeout
};

const createError = properties => {
    const err = Object.assign(Object.create(Error.prototype), properties);
    Error.captureStackTrace(err, createError);
    return err
};

function makeTimeout(timeoutMS) {
    let _handler;
    let _reject;
    let _pending = true;
    return Object.assign(new Promise((resolve, reject) => {
        _reject = reject;
        const timeoutErr = createError({
            message: 'Server timed out!',
            code: 'ETIMEDOUT'
        });
        _handler = setTimeout(err => {
            _pending = false;
            reject(err)
        }, timeoutMS, timeoutErr)
    }), {
        cancel() {
            clearTimeout(_handler);
            if (_pending) {
                const cancelledErr = createError({
                    message: 'Task was cancelled!',
                    code: 'ECANCELLED'
                });
                _reject(cancelledErr);
                _pending = false
            }
            return this
        }
    })
}

function getThreads(subreddits) {

    return new Promise(function (resolve, reject) {
        let threadsArray = [];
        let subredditsArray = subreddits.split(";");
        let numberOfCalls = subredditsArray.length;

        subredditsArray.forEach(function (item) {

            let pageUrl = config().baseUrl + '/r/' + item + '/top/?limit=100&t=day';
            utils.asyncLoop(config().infiniteIterations, function (loop) {

                    return new GetPageThreadsPromise(pageUrl, config().limit)
                        .then(function (data) {
                            data.threads.forEach(function (item) {
                                threadsArray.push(item);
                            });
                            if (data.isPartial === true && !util.isNil(data.nextUrl)) {
                                pageUrl = data.nextUrl;
                                numberOfCalls++;
                                loop.next();
                            } else {
                                numberOfCalls--;
                                loop.break();
                            }
                        }, function (errorData) {
                            //console.log(errorData);
                            numberOfCalls--;
                            if (numberOfCalls <= 0) {
                                reject(errorData)
                            }

                        });
                },

                function () {
                    if (numberOfCalls <= 0) {
                        resolve(threadsArray);
                    }
                })
        })
    })
}

function GetPageThreadsPromise(pageUrl, scoreLimit) {

    return new Promise(function (resolve, reject) {

            if (utils.isNil(pageUrl)) {
                throw new TypeError('invalid pageURL')
            }
            if (!utils.isThisActuallyANumberDontLie(scoreLimit)) {
                throw new TypeError('invalid scoreLimit')
            }

            let returnObject = {
                threads: [],
                isPartial: false,
                nextUrl: "",
                message: ""
            };


            let _ph, _page;
            let minScore = Number.MAX_SAFE_INTEGER;

            phantom
                .create()
                .then(ph => {
                    _ph = ph;
                    return _ph.createPage();
                })
                .then(page => {
                    _page = page;
                    return _page.open(pageUrl);
                })
                .then(status => {
                    //console.log(status);
                    if (status !== "success") {
                        returnObject.message = "Error accessing: " + pageUrl;
                        reject(returnObject)
                    }
                    return _page.property('content');
                })
                .then(content => {
                    let $ = cheerio.load(content);
                    $('.thing').each(function () {
                        let score = parseInt($(this).attr('data-score'));


                        try {
                            if (score >= scoreLimit) {

                                let $$ = cheerio.load($(this).html());
                                let title = $$('.title > a').text();
                                let subreddit = $(this).attr('data-subreddit');
                                let commentsLink = $$('.first > a').attr('href');
                                let rank = parseInt($(this).attr('data-rank'));
                                let threadLink = config().baseUrl + "/r/" + subreddit + "/top/?limit=1&count=" + (rank - 1).toString();

                                let newThread = Thread({
                                    title: title,
                                    score: score,
                                    rank: rank,
                                    subreddit: subreddit,
                                    commentsLink: commentsLink,
                                    threadLink: threadLink
                                });

                                returnObject.threads.push(newThread)
                            }

                            if (score < minScore) {
                                minScore = score;
                            }
                        } catch (e) {
                            returnObject.message = "Error parsing: title " + title + " threadLink " + threadLink;
                            reject(returnObject)
                        }

                    });

                    let nextPage = "";
                    if (minScore >= scoreLimit) {
                        nextPage = $('.next-button > a').attr('href');
                    }
                    if (!utils.isNil(nextPage) && minScore >= scoreLimit) {
                        returnObject.isPartial = true;
                        returnObject.nextUrl = nextPage;
                    }

                    returnObject.message = returnObject.threads.length + " threads were parsed on " + pageUrl;


                    let closeProject = _page.close();

                    closeProject.then(function () {
                        resolve(returnObject);
                        _ph.exit()
                    })


                })
                .catch(e => {
                    returnObject.message = "Error accessing: " + pageUrl;
                    reject(returnObject);
                    console.log(e)
                });


        }
    );
}

