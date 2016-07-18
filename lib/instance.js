'use strict'
const output = require('./output')
const Container = require('./container')

class Instance {
  /**
   * Constucts a new DevLab instance/process
   * @param {Object} args Arguments passed into the instance
   */
  constructor(args) {
    if (this.args.h) { output.log('help'); process.exit(0) }
    if (this.args.v) { output.log('version'); process.exit(0) }
    this.opts = args
  }

  /**
   * Sets instance options/config by merging arguments from the constructor
   * with config yaml import
   * @params {Object} args Arguments received from instance startup
   */
  set opts(args) {
    // Merge the args against the config and shit...
  }

  /**
   * Gets `opts` from private class property
   * @returns {Object}
   */
  get opts() {
    return this._opts
  }

  /**
   * Starts the DevLab process by instantiating a new container which
   * recurses any services and sets up other containers needed to handle
   * execution
   */
  start() {
    const instance = new Container(this.opts)
    instance.build()
  }
}

module.exports = Instance
