'use strict'

const dir = require('node-dir')
const parseRDF = require('./lib/parse-rdf.js')
const dirname = process.argv[2]
const options = {
    match: /\.rdf$/, // Match file names that in '.rdf'.
    exclude: ['pg0.rdf'], // Ignore the template RDF file (ID = 0).
}
dir.readFiles(dirname, options, (err, content, next) => {
    if (err) throw err
    const doc = parseRDF(content)
    console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }))
    console.log(JSON.stringify(doc))
    next()
})

process.stdout.on('error', err => {
    if (err.code === 'EPIPE') {
        process.exit()
    }
    throw err // Or take any other appropriate action.
})