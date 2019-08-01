module.exports = function () {

    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                'baseUrl': 'https://old.reddit.com',
                'limit' : 5000,
                'botToken': '934353641:AAGOpljU40EK5a6Ft68JFhQiV7pqiyM4GRQ',
                'infiniteIterations' : Number.MAX_SAFE_INTEGER
            };
            break;

        case 'production':
            return {
                'baseUrl': 'https://old.reddit.com',
                'limit' : 5000,
                'botToken': '934353641:AAGOpljU40EK5a6Ft68JFhQiV7pqiyM4GRQ',
                'infiniteIterations' : Number.MAX_SAFE_INTEGER
            };
            break;

        default:
            return {
                'baseUrl': 'https://old.reddit.com',
                'limit' : 5000,
                'botToken': '934353641:AAGOpljU40EK5a6Ft68JFhQiV7pqiyM4GRQ',
                'infiniteIterations' : Number.MAX_SAFE_INTEGER
            }
    }
};
