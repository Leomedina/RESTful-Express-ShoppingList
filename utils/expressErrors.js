/**
 * 
 * ExpressError extends Error so we can add a status and handle 
 * the error better when making an instance of it.
 * 
 * Error handling middleware will return this.
 * 
 */

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;