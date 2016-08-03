'use strict'

const parseOpts = require('lib/util/parseOpts')

describe('parseOpts', () => {
  describe('parseHostEnvVars', () => {
    it('parses and replaces ${..} delimited environment variables', () => {
      process.env.FOO = 'bar'
      const result = parseOpts.parseHostEnvVars('${FOO}')
      expect(result).to.equal('bar')
    })
  })
  describe('parseEnvVars', () => {
    it('processes an array of env vars and returns arguments', () => {
      const result = parseOpts.parseEnvVars([ 'FOO=bar' ])
      expect(result).to.deep.equal([ '-e', 'FOO=bar' ])
    })
  })
  describe('parseExpose', () => {
    it('processes an array of ports and returns arguments', () => {
      const result = parseOpts.parseExpose([ '8080:8080' ])
      expect(result).to.deep.equal([ '-p', '8080:8080' ])
    })
  })
  describe('parseVolumes', () => {
    it('processes an array of volumes and returns arguments', () => {
      const result = parseOpts.parseVolumes([ '/testHost:/testGuest' ])
      expect(result).to.deep.equal([ '-v', '/testHost:/testGuest' ])
    })
  })
  describe('parseHostMap', () => {
    it('parses a host map', () => {
      const args = parseOpts.parseHostMap({ foo: '0.0.0.0' })
      expect(args).to.deep.equal([ '--add-host', 'foo:0.0.0.0' ])
    })
  })
})
