'use strict'

const Instance = require('lib/instance')
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
})