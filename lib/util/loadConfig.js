'use strict'

const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const output = require('../output')

/**
 * Loads yaml file based on configPath
 * @param {String} configPath Path to the config file
 * @returns {Object} config
 */
module.exports = (configPath) => {
  try {
    return yaml.safeLoad(fs.readFileSync(path.normalize(configPath), 'utf8'))
  } catch (e) {
    output.error(`Could not load config ${path.normalize(configPath)}`)
    process.exit(1)
  }
}
