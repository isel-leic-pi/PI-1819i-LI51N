'use strict'

const fs = require('fs')

if(process.argv.length == 2)
    throw new Error('You must provide filenames!')


process
    .argv
    .slice(2)
    .forEach(filename => {
        console.log('Reading ' + filename)
        const data = fs.readFileSync(filename)
        console.log('##########################################################')
        console.log(data.toString())  
    })