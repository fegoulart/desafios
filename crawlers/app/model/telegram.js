'use strict'

let t = require('tcomb');

const TextMessage = t.struct ({
    "chatId" : t.Number,
    "message": t.String
})

const Backlog = t.struct({
   "chatId": t.Number,
    "subreddits": t.Array
}, 'Backlog');

module.exports = {
    Backlog: Backlog,
    TextMessage: TextMessage
};