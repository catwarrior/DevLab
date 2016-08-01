'use strict'
require('mocha-sinon')
const output = require('lib/output')

describe('output', () => {
  let logSpy
  beforeEach(() => {
    logSpy = sinon.spy(output, 'log')
  })
  afterEach(() => {
    output.log.restore()
  })
  describe('renderVars', () => {
    it('replaces mustache-bracket delimited vars', () => {
      expect(output.renderVars('this is a {{test}}')).to.equal('this is a \u001b[34mtest\u001b[39m')
    })
  })
  describe('success', () => {
    it('outputs a success message', () => {
      output.success('test-success')
      expect(logSpy).to.be.called
    })
  })
  describe('warn', () => {
    it('outputs a warn message', () => {
      output.warn('test-warn')
      expect(logSpy).to.be.called
    })
  })
  describe('error', () => {
    it('outputs an error message', () => {
      output.error('test-error')
      expect(logSpy).to.be.called
    })
  })
})
