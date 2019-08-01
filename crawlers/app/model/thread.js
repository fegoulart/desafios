'use strict'

let t = require('tcomb');

const Thread = t.struct({
    title: t.String,
    score: t.Integer,
    rank: t.Integer,
    subreddit: t.String,
    commentsLink: t.String,
    threadLink: t.String
}, 'Thread');

module.exports = Thread;