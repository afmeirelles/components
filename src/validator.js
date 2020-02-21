const Ajv = require('ajv')
const _ = require('lodash')
const { VALIDATION_ERROR } = require('./errors')

/**
 * Simple ajv wrapper that throws a VALIDATION_ERROR when ajv validation fails
 */

module.exports = (schema, data) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, data)
    if (!valid) throw new VALIDATION_ERROR(ajv.errorsText(ajv.errors), _.get(ajv, 'errors.[0].params') )
}