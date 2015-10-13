var slice = Array.prototype.slice;

/**
 * Make standard Node.js style callback more flexible with optional callback
 * and Promise result.
 * @param {function} async
 * @returns {function}
 */
function flexasync(async) {
    /**
     * @param {...*} args
     * @param {function} [done]
     * @returns {Promise}
     */
    return function() {
        var context = this,
            args = slice.call(arguments),
            done;

        if (typeof args[args.length-1] === "function") done = args.shift();

        return new Promise(function(resolve, reject) {
            async.apply(context, args.concat(function(err, result) {
                if (err) {
                    done && done(err);
                    reject(err);
                } else {
                    done && done.apply(null, arguments);
                    resolve(result);
                }
            }));
        });
    };
}

module.exports = flexasync;
