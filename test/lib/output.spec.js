'use strict'
require('mocha-sinon')
const output = require('lib/output')
const chalk = require('chalk')

describe('output', () => {
  let logStub
  beforeEach(() => {
    logStub = sinon.stub(output, 'log')
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
      expect(logStub).to.be.calledWith(chalk.bold.green('⦿ ') + chalk.bold(output.renderVars('test-success')))
    })
  })
  describe('warn', () => {
    it('outputs a warn message', () => {
      output.warn('test-warn')
      expect(logStub).to.be.calledWith(chalk.bold.yellow('⦿ ') + chalk.bold(output.renderVars('test-warn')))
    })
  })
  describe('error', () => {
    it('outputs an error message', () => {
      output.error('test-error')
      expect(logStub).to.be.calledWith(chalk.bold.red('⦿ ') + chalk.bold(output.renderVars('test-error')))
    })
  })
  describe('insertBreak', () => {
    it('outputs a grey line break', () => {
      output.insertBreak()
      expect(logStub).to.be.calledWith(chalk.gray('---'))
    })
  })
})
