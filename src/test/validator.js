const expect = require('expect.js')

const validator = require('../validator')

// this suite tests the validation component against
// the most common ajv schemas

describe('the validator component', () => {
    
    const defaultError = {
        name: 'VALIDATION_ERROR',
        message: '',
        info: {}
    }

    it('should throw if a property is missing', () => {
        const schema = {
            type: 'object',
            properties: {
                first: { type: 'string' },
                second: { type: 'string' }
            },
            required: [ 'second' ]
        }
        try {
            validator(schema, {})
            expect().fail('should have thrown an exception')
        } catch (error) {
            expect(error).to.eql({
                ...defaultError,
                message: "data should have required property 'second'",
                info: {
                    missingProperty: 'second'
                }
            })
        }
    })

    it('should throw if a property type is incorrect', () => {
        const schema = {
            type: 'object',
            properties: {
                first: { type: 'number' },
                second: { type: 'string' }
            },
        }
        try {
            validator(schema, { first: '1', second: '2' })
            expect().fail('should have thrown an exception')
        } catch (error) {
            expect(error).to.eql({
                ...defaultError,
                message: 'data.first should be number',
                info: {
                    type: 'number'
                }
            })
        }
    })

    it('should throw if a property does not matches the enum', () => {
        const schema = {
            type: 'object',
            properties: {
                first: { enum: [ 1, 2, 3 ] },
                second: { type: 'string' }
            },
        }
        try {
            validator(schema, { first: 4, second: '2' })
            expect().fail('should have thrown an exception')
        } catch (error) {
            expect(error).to.eql({
                ...defaultError,
                message: 'data.first should be equal to one of the allowed values',
                info: {
                    allowedValues: [ 1, 2 , 3 ]
                }
            })
        }
    })

    it('should throw if an additional prop is sent', () => {
        const schema = {
            type: 'object',
            additionalProperties: false,
            properties: {
                first: { enum: [ 1, 2, 3 ] },
                second: { type: 'string' }
            },
        }
        try {
            validator(schema, { first: 1, second: '2', this: 'should not be here' })
            expect().fail('should have thrown an exception')
        } catch (error) {
            expect(error).to.eql({
                ...defaultError,
                message: 'data should NOT have additional properties',
                info: {
                    additionalProperty: 'this'
                }
            })
        }
    })

    it('should return nothing if validations pass', () => {
        const schema = {
            type: 'object',
            properties: {
                first: { enum: [ 1, 2, 3 ] },
                second: { type: 'string' }
            },
            required: [ 'first', 'second' ]
        }
        expect(validator(schema, { first: 1, second: '2' })).to.be()
    })

})