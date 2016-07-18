'use strict'
const loadConfig = require('lib/util/loadConfig')
const output = require('lib/output')

describe('loadConfig', () => {
  it('loads a yaml config file and returns and object when path exists', () => {
    const actual = loadConfig('test/fixtures/basic.devlab.yml')
    expect(actual.from).to.equal('node:4')
  })
  it('outputs an error and exits the process if config path does not exists', () => {
    const processExitStub = sinon.stub(process, 'exit', () => {})
    const outputErrorStub = sinon.stub(output, 'error')
    loadConfig('foo/bar')
    expect(processExitStub).to.be.calledWith(1)
    expect(outputErrorStub).to.be.calledWith('Could not load config foo/bar')
  })
})
