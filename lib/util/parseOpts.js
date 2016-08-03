'use strict'

const opts = {

  /**
   * Process environment variables
   * @param {Array} env Array of environment variables
   * @returns {Array} env var flags and args
   */
  parseEnvVars: env => env.reduce((envs, e) => { return envs.concat([ '-e', parsers.parseHostEnvVars(e) ]) }, []),

  /**
   * Process any ports to expose
   * @param {Array} expose Array of ports to expose
   * @returns {Array} port expose flags and args
   */
  parseExpose: expose => expose.reduce((ports, p)=> { return ports.concat([ '-p', p ]) }, []),

  /**
   * Process any volumes to map
   * @param {Array} volumes Array of volumes to map
   * @returns {Array} volume map flags and args
   */
  parseVolumes: volumes => volumes.reduce((vols, v) => { return vols.concat([ '-v', parsers.parseHostEnvVars(v) ]) }, []),

  /**
   * Parse /etc/hosts mappings
   * @param {Object} map A mapping of hostname to IP address
   * @returns {Array} an array of Docker arguments to set up the host maps.
   */
  parseHostMap: map => {
    const args = []
    _.forOwn(map, (val, key) => {
      args.push('--add-host')
      args.push(`${key}:${val}`)
    })
    return args
  },

  build: (opts) => {
    const args = [ 'run', '--privileged', mode ]
    const env = opts.env ? opts.parseEnvVars(opts.env) : []
    const ports = opts.expose ? opts.parseExpose(opts.expose) : []
    const volumes = opts.volumes ? opts.parseVolumes(opts.volumes) : []
    const hosts = opts.hosts ? opts.parseHostMap(opts.hosts) : []
    // Spawn arguments
    const mode = opts.interactive || process.stdout.isTTY  ? '-it' : '-t'
    // Check for no-rm
    if (!process.env.DEVLAB_NO_RM || process.env.DEVLAB_NO_RM === 'false') args.push('--rm')
    // Workdir config
    const workdir = [ '-v', `${opts.workdir}:${opts.workdir}`, '-w', opts.workdir ]
    // Set name
    const name = [ '--name', `dl_${ opts.name || opts.from.toLowerCase().replace(':','_') }` ]
    // From (image) config
    const from = [ opts.from ]
    // Split command into (space delimited) parts
    const cmd = [ 'sh', '-c', opts.run ]
    // Build full args array
    return args
      .concat(serviceLinks.length && serviceLinks || [])
      .concat(env.length && env || [])
      .concat(ports.length && ports || [])
      .concat(volumes.length && volumes || [])
      .concat(hosts.length && hosts || [])
      .concat(workdir).concat(name).concat(from).concat(cmd)
  }
}
