/**
 * Initialize storage.
 */
function Storage() {
    
}

/**
 * Enable synchronous key/value storage.
 * @param {readSync} read
 * @param {writeSync} [write]
 * @param {removeSync} [remove]
 */
Storage.prototype.enableSyncKey = function(read, write, remove) {
    this.readSync = read;
    this.writeSync = write || unsupported;
    this.removeSync = remove || unsupported;
};

/**
 * Enable asynchronous key/value storage.
 * @param {read} read
 * @param {write} [write]
 * @param {remove} [remove]
 */
Storage.prototype.enableAsyncKey = function(read, write, remove) {
    this.read = flexasync(read);
    this.write = write ? flexasync(write) : unsupported;
    this.remove = remove ? flexasync(remove) : unsupported;
};

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

/**
 * Throw an 'unsupported' error.
 */
function unsupported() {
    throw new Error("unsupported");
}

module.exports = Storage;

/**
 * @callback errback
 * @param {Error|null} err
 */

/**
 * @callback resultback
 * @param {Error|null} err
 * @param {*} result
 */

/**
 * @callback read
 * @param {string} key
 * @param {resultback} done
 */

/**
 * @callback write
 * @param {string} key
 * @param {*} value
 * @param {errback} done
 */

/**
 * @callback remove
 * @param {string} key
 * @param {errback} done
 */

/**
 * @callback readSync
 * @param {string} key
 * @returns {*}
 */

/**
 * @callback writeSync
 * @param {string} key
 * @param {*} value
 */

/**
 * @callback removeSync
 * @param {string} key
 */
