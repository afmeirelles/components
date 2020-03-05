const expect = require('expect.js')
const sinon = require('sinon')
const memoize = require('../memoize')

describe('the memoize component', () => {

    it('should call fn only once since key is cached', () => {
        const spyFn = sinon.spy()
        const cachedFn = memoize([ { 'foo': 'bar', 'foz': 'baz' }], spyFn)
        cachedFn('foo')
        cachedFn('foo')
        cachedFn('foo')
        expect(spyFn.calledOnce).to.be.ok()
    })

})