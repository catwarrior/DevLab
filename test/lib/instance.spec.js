'use strict'

const Instance = proxyquire('lib/instance', {
  shelljs: {
    pwd: () => `${__dirname}/test/fixtures`
  }
})
const output = require('lib/output')

describe('Instance', () => {
  describe('constructor', () => {
    let outputLogStub
    let processExitStub
    beforeEach(() => {
      outputLogStub = sinon.stub(output, 'log', (msg) => msg)
      processExitStub = sinon.stub(process, 'exit', () => null)
    })
    afterEach(() => {
      output.log.restore()
      process.exit.restore()
    })
    it('logs help message and exits if arg `h` is passed', () => {
      const testInstance = new Instance({ h: true, c: 'test/fixtures/basic.devlab.yml' })
      expect(outputLogStub).to.be.calledWith(testInstance.helpMsg)
      expect(processExitStub).to.be.calledWith(0)
    })
    it('logs version message and exits if `v` is passed', () => {
      const testInstance = new Instance({ v: true, c: 'test/fixtures/basic.devlab.yml' })
      expect(outputLogStub).to.be.calledWith(testInstance.version)
      expect(processExitStub).to.be.calledWith(0)
    })
  })
  describe('(setter) opts', () => {
    const emptyDevlab = 'test/fixtures/starter.devlab.yml'
    const blankDevlab = 'test/fixtures/blank.devlab.yml'
    let testInstance
    let outputErrorStub
    let processExitStub
    beforeEach(() => {
      outputErrorStub = sinon.stub(output, 'error', (msg) => msg)
      processExitStub = sinon.stub(process, 'exit', () => null)
      testInstance = new Instance({ c: emptyDevlab })
    })
    afterEach(() => {
      output.error.restore()
      process.exit.restore()
      testInstance = null
    })
    it('loads the config file from the default (devlab.yml) in cwd', () => {
      testInstance.opts = {}
      expect(testInstance.opts).to.have.any.keys([ 'from', 'services', 'env', 'expose' ])
    })
    it('loads the config file from arg `c`', () => {
      testInstance.opts = { c: 'test/fixtures/devlab.yml' }
      expect(testInstance.opts).to.have.any.keys([ 'from', 'services', 'env', 'expose' ])
    })
    it('outputs error if no `from` property is set', () => {
      testInstance.opts = { c: blankDevlab }
      expect(outputErrorStub).to.be.calledWith('No `from` property set')
      expect(processExitStub).to.be.calledWith(1)
    })
    it('overrides `from` if `f` arg is passed', () => {
      testInstance.opts = { c: emptyDevlab, f: 'foo:bar' }
      expect(testInstance.opts.from).to.equal('foo:bar')
    })
    it('overrides `quiet` property if `q` arg is passed', () => {
      testInstance.opts = { c: emptyDevlab, q: true }
      expect(testInstance.opts.quiet).to.be.true
    })
    it('overrides `exec` property if `e` arg is passed', () => {
      testInstance.opts = { c: emptyDevlab, e: true }
      expect(testInstance.opts.exec).to.be.true
    })
    it('sets the `task` property if command is provided', () => {
      testInstance.opts = { c: emptyDevlab, _: [ 'foo' ] }
      expect(testInstance.opts.task).to.equal('foo')
    })
  })
})
