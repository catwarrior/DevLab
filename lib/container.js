'use strict'

class Container {
  /**
   * Constructs new Container instance
   * @param {Object} opts Configuration for container
   */
  constructor(opts) {
    this._opts = opts
  }

  /**
   * Gets `opts` from private class property
   * @returns {Object}
   */
  get opts() {
    return this._opts
  }

  /**
   * Builds new container instance
   */
  build() {

  }
}

module.exports = Container
