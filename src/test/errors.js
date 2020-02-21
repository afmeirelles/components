const expect = require('expect.js')
const sinon = require('sinon')

const {
    ALREADY_CREATED,
    NOT_FOUND,
    UNAUTHORIZED,
    UNCAUGHT_ERROR,
    VALIDATION_ERROR,
    toHttp
} = require('../errors')

const mockResponse = () => {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    return res
}

describe('the errors component', () => {

    let res

    beforeEach(() => {
        res = mockResponse()
    })

    it('should convert an ALREADY_CREATED error into a 409 HTTP error', () => {
        const expectedBody = { message: '409', info: '409 '}
        toHttp(new ALREADY_CREATED(expectedBody.message, expectedBody.info), res)
        expect(res.status.firstCall.args).to.eql([ 409 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should convert a NOT_FOUND error into a 409 HTTP error', () => {
        const expectedBody = { message: '404', info: '404 '}
        toHttp(new NOT_FOUND(expectedBody.message, expectedBody.info), res)
        expect(res.status.firstCall.args).to.eql([ 404 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should convert an UNAUTHORIZED error into a 409 HTTP error', () => {
        const expectedBody = { message: '401', info: '401 '}
        toHttp(new UNAUTHORIZED(expectedBody.message, expectedBody.info), res)
        expect(res.status.firstCall.args).to.eql([ 401 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should convert an UNCAUGHT_ERROR error into a 409 HTTP error', () => {
        const expectedBody = { message: '500', info: '500 '}
        toHttp(new UNCAUGHT_ERROR(expectedBody.message, expectedBody.info), res)
        expect(res.status.firstCall.args).to.eql([ 500 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should convert a VALIDATION_ERROR error into a 409 HTTP error', () => {
        const expectedBody = { message: '422', info: '422 '}
        toHttp(new VALIDATION_ERROR(expectedBody.message, expectedBody.info), res)
        expect(res.status.firstCall.args).to.eql([ 422 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should convert any other error into a 500 HTTP error', () => {
        const expectedBody = { message: '500', info: undefined }
        toHttp(new Error(expectedBody.message), res)
        expect(res.status.firstCall.args).to.eql([ 500 ])
        expect(res.json.firstCall.args).to.eql([ expectedBody ])
    })

    it('should return a UNCAUGHT_ERROR', () => {
        expect(
            new UNCAUGHT_ERROR('500', 'some unexpected error')
        ).to.eql({
            name: 'UNCAUGHT_ERROR',
            message: '500',
            info: 'some unexpected error'
        })
    })

    it('should add the default message to ALREADY_CREATED, NOT_FOUND and UNAUTHORIZED', () => {
        expect((new ALREADY_CREATED()).message).to.be('Resource already created')
        expect((new NOT_FOUND()).message).to.be('Resource not found')
        expect((new UNAUTHORIZED()).message).to.be('Invalid credentials')
    })

})