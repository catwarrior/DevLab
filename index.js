#!/usr/bin/env node
'use strict'
const min = require('minimist')
const Instance = require('./lib/instance')
const args = min(process.argv.slice(process.argv[0] === 'node' ? 1 : 2))
const app = new Instance(args)
app.start()
