/**
 * List of application errors to throw and a handler
 * to map app errors to HTTP ones, using express-like
 * response sintax
 */

/**
 * Thrown when requets tries to create something 
 * that already exists
 */
class ALREADY_CREATED {
    constructor(message, info) {
        this.name = 'ALREADY_CREATED'
        this.message = message || 'Resource already created'
        this.info = info
    }
}

/**
 * Thrown when something that should exist isn't found
 */
class NOT_FOUND {
    constructor(message, info) {
        this.name = 'NOT_FOUND'
        this.message = message || 'Resource not found'
        this.info = info
    }
}

/**
 * Thrown when request credentials are invalid or requester
 * doesn't have authorization to perform it
 */
class UNAUTHORIZED {
    constructor(message, info) {
        this.name = 'UNAUTHORIZED'
        this.message = message || 'Invalid credentials'
        this.info = info
    }
}

/**
 * Thrown when an unexpected error occurs. This is the fallback error,
 * ideally you'd handle all errors semantically
 */
class UNCAUGHT_ERROR {
    constructor(message, info) {
        this.name = 'UNCAUGHT_ERROR'
        this.message = message
        this.info = info
    }
}

/**
 * Thrown when a validation rule fails
 */
class VALIDATION_ERROR {
    constructor(message, info) {
        this.name = 'VALIDATION_ERROR'
        this.message = message
        this.info = info
    }
}

/**
 * Maps application errors to HTTP ones
 * @param {*} error the error thrown
 * @param {*} res express.js response obj or something alike
 */
const toHttp = (error, res) => {

    let status = 500 // fallback UNCAUGHT_ERROR maps to an INTERNAL SERVER ERROR
    if (error instanceof UNAUTHORIZED) status = 401
    if (error instanceof NOT_FOUND) status = 404
    if (error instanceof ALREADY_CREATED) status = 409
    if (error instanceof VALIDATION_ERROR) status = 422

    return res.status(status).json({ message: error.message, info: error.info })
}

module.exports = { 
    UNAUTHORIZED,
    NOT_FOUND,
    ALREADY_CREATED,
    VALIDATION_ERROR,
    UNCAUGHT_ERROR,
    toHttp
}