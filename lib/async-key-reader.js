var flexasync = require("./flexasync");

/**
 * Implement AsyncKeyReader.
 * @param {function} Storage
 * @param {read} read
 * @returns {function} AsyncKeyReader
 */
function AsyncKeyReader(Storage, read) {
    /**
     * @name AsyncKeyReader#read
     * @param {string} key
     * @param {resultback} [done]
     * @returns {Promise}
     */
    Storage.prototype.read = flexasync(read);

    return Storage;
}

module.exports = AsyncKeyReader;

/**
 * @typedef AsyncKeyReader
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

