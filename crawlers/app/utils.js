'use strict'

module.exports = {
    isNil: isNil,
    isThisActuallyANumberDontLie: isThisActuallyANumberDontLie,
    asyncLoop: asyncLoop
};

function isNil(data) {
    return (data === null || data === "" || data == undefined);
}

function isThisActuallyANumberDontLie(data) {
    return (typeof data === "number" && !isNaN(data));
}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function () {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function () {
            return index - 1;
        },

        break: function () {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}