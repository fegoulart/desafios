'use strict';

let chai = require('chai');
let config = require('../../config');
let expect = chai.expect;
let threads = require('../../controller/thread');

chai.use(require('chai-things'));

let subreddits = "cats;aww;AskReddit"

describe('Get reddits test', function () {
    it('should return data', function (done) {
        this.timeout(config().timeout+5000);
        return threads.getThreads(subreddits).then(
            function (threadsArray) {
                let regexTest = true
                if (threadsArray.length === 0 ) {
                  regexTest = false;
                }
                threadsArray.forEach(function(item){
                    let message = item.score + " - " + item.subreddit + " - " + item.title + " - " + item.threadLink + " - " + item.commentsLink;
                    let patt = new RegExp("^\\d+ - \\w+ - [\\w| ]+ - https:\\/\\/old\\.reddit\\.com\\/.+ - https:\\/\\/old\\.reddit\\.com\\/.+$");
                    if (patt.test(message) === false){
                        regexTest = false;
                    }

                })
                expect(regexTest).to.be.equal(true);
                done();
            }, function(err) {
                console.log(err);
                expect(false).to.be.equal(true);
                done();
            });


    });
});
