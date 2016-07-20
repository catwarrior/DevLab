'use strict'
const loadConfig = require('lib/util/loadConfig')
const output = require('lib/output')

describe('loadConfig', () => {
  let processExitStub
  let outputErrorStub
  before(() => {
    processExitStub = sinon.stub(process, 'exit', () => {})
    outputErrorStub = sinon.stub(output, 'error', () => null)
  })
  after(() => {
    process.exit.restore()
    output.error.restore()
  })
  it('loads a yaml config file and returns and object when path exists', () => {
    const actual = loadConfig('test/fixtures/devlab.yml')
    expect(actual.from).to.equal('node:4')
  })
  it('outputs an error and exits the process if config path does not exists', () => {
    loadConfig('foo/bar')
    expect(processExitStub).to.be.calledWith(1)
    expect(outputErrorStub).to.be.calledWith('Could not load config foo/bar')
  })
})
