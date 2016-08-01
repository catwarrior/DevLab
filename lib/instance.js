'use strict'
const shelljs = require('shelljs')
const output = require('./output')
const Container = require('./container')
const loadConfig = require('./util/loadConfig')
const pkg = require('../package.json')

class Instance {
  /**
   * Constucts a new DevLab instance/process
   * @param {Object} args Arguments passed into the instance
   */
  constructor(args) {
    if (args.h) { output.log(this.helpMsg); process.exit(0) }
    if (args.v) { output.log(this.version); process.exit(0) }
    this.opts = args
  }

  /**
   * Sets instance options/config by merging arguments from the constructor
   * with config yaml import
   * @params {Object} args Arguments received from instance startup
   */
  set opts(args) {
    this._opts = loadConfig(args.c ? args.c : `${shelljs.pwd()}/devlab.yml`) || {}
    if (!this._opts.from && !args.f) { output.error('No `from` property set'); process.exit(1) }
    this._opts.from = args.f ? args.f : this._opts.from
    this._opts.quiet = !!args.q
    this._opts.exec = args.e ? args.e : false
    this._opts.task = args._ ? args._.pop() : false
  }

  /**
   * Gets `opts` from private class property
   * @returns {Object}
   */
  get opts() {
    return this._opts
  }

  /**
   * Gets application help message
   * @returns {String}
   */
  get helpMsg() {
    return `
    ${pkg.name} v.${pkg.version}\n
    Usage: ${pkg.name} [task] [options]\n
      -h   Show this help message
      -v   Show current version
      -e   Run custom command(s): -e "command"
      -f   Set FROM (Docker image): -f "container:tag"
      -c   Set config to load (YAML): -c "/path/to/config.yml
      -q   Supresses verbose output"\n`
  }

  /**
   * Gets application version
   * @returns {String} version
   */
  get version() {
    return pkg.version
  }

  /**
   * Starts the DevLab process by instantiating a new container which
   * recurses any services and sets up other containers needed to handle
   * execution
   */
  start() {
    const primary = new Container(this.opts)
    primary.build()
  }
}

module.exports = Instance
