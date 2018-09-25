'use strict'

const fs = require('fs')

if(process.argv.length == 2)
    throw new Error('You must provide a filename!')

const filename = process.argv[2]

fs.watch(filename, (ev) => console.log(`File ${filename} changed! ${ev}`))
console.log(`Now watching ${filename} for changes...`)

