'use strict'

class Container {
  /**
   * Constructs new Container instance
   * @param {Object} opts Configuration for container
   */
  constructor(opts) {
    // TODO: If opts is a link to a different devlab, load it here
    this._opts = opts
    this._containers = []
  }

  /**
   * Builds new container instance
   * @returns {Array} all containers required for run
   */
  build() {
    let serviceList = this._opts.services ? Object.keys(this._opts.services) : []
    serviceList = this._opts.serviceList || serviceList
    serviceList.forEach(serviceName => {
      const inst = new Container(this._opts.services[serviceName])
      this._containers = this._containers.concat(inst.build())
    })
    this._containers.push(this)
    return this._containers
  }
}

module.exports = Container
