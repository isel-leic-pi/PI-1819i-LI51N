'use strict'

const fs = require('fs')

if(process.argv.length == 2)
    throw new Error('You must provide filenames!')

const args = process.argv
for (let index = 2; index < args.length; index++) {
    const filename = args[index]
    console.log('Reading ' + filename)
    const data = fs.readFileSync(filename)
    console.log('##########################################################')
    console.log(data.toString())  
}


