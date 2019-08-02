'use strict';

let thread = require('./thread');
let config = require('../config.js');

module.exports = {
    checkGoulartBot: checkGoulartBot
};

const {TelegramClient} = require('messaging-api-telegram');

const client = TelegramClient.connect(config().botToken);

let updateId = 0;

function checkGoulartBot() {
    return new Promise(function (resolve, reject) {
        try {
            if (process.env.DEBUG === "messaging-api-telegram") {
                let today = new Date();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("CheckGoulartBot called at " + time.toString())
            }
            client.getWebhookInfo().then(info => {
                if (info.pending_update_count > 0) {
                    grabData(updateId).then(() => {
                        resolve()
                    })

                } else {
                    resolve()
                }
            });
        } catch (e) {
            reject(e)
        }
    })
}

function grabData(offsetId) {
    return new Promise(function (resolve) {
        let patt = new RegExp("^\/nadaprafazer (\\w+)(?:;(\\w+))*$");
        client
            .getUpdates({
                limit: 10,
                offset: offsetId
            })
            .then(updates => {

                if (updates.length === 0) {
                    resolve()
                }

                updates.forEach(function (item) {
                    let chatId = item.message.chat.id;
                    let subreddits = "";
                    if (item.update_id >= updateId) {
                        updateId = item.update_id + 1
                    }
                    if (patt.test(item.message.text)) {

                        subreddits = item.message.text.substr(14);
                        return new thread.getThreads(subreddits)
                            .then(function (threadsArray) {
                                let count = threadsArray.length;
                                if (count <= 0) {
                                    respond(chatId, "No relevant data found").then(() => {
                                        resolve()
                                    })
                                }
                                threadsArray.forEach(function (item) {
                                    let text = item.score + " - " + item.subreddit + " - " + item.title + " - " + item.threadLink + " - " + item.commentsLink;
                                    respond(chatId, text).then(() => {
                                        count--;
                                        if (count <= 0) {
                                            resolve()
                                        }
                                    })
                                })
                            })

                    } else {
                        resolve()
                    }
                }, function (errorData) {
                    throw errorData
                })

            })
    });
}


function respond(chatId, message) {
    return new Promise(function (resolve) {
        client.sendMessage(chatId, message, {
            disable_web_page_preview: true,
            disable_notification: true,
        }).then(() => resolve());
    })
}