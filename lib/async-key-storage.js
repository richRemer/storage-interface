var AsyncKeyReader = require("./async-key-reader"),
    flexasync = require("./flexasync");

/**
 * Implement AsyncKeyStorage.
 * @param {function} Storage
 * @param {read} read
 * @param {write} write
 * @param {remove} remove
 * @returns {function} AsyncKeyStorage
 */
function AsyncKeyStorage(Storage, read, write, remove) {
    Storage = AsyncKeyReader(Storage, read);
    
    /**
     * @name AsyncKeyReader#write
     * @param {string} key
     * @param {*} value
     * @param {errback} [done]
     * @returns {Promise}
     */
    Storage.prototype.write = flexasync(write);
    
    /**
     * @name AsyncKeyReader#remove
     * @param {string} key
     * @param {errback} [done]
     * @returns {Promise}
     */
    Storage.prototype.remove = flexasync(remove);

    return Storage;
}

module.exports = AsyncKeyStorage;

/**
 * @typedef AsyncKeyStorage
 * @augments {AsyncKeyReader}
 */

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

