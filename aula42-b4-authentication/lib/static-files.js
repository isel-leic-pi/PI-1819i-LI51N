'use strict'

const fs = require('fs')

module.exports = staticFiles

/**
 * 
 * @param {*} location The path where are stored the static files.
 */
function staticFiles(location) {
    return (req, res, next) => {
        if(req.path.indexOf('.') < 0) // If not requesting a static file
            return next()
        // Read a file from disk and send it to the response
        const path = location + req.path
        fs.stat(path, (err) => {
            if(!err){
                // Falta o content-type
                fs
                    .createReadStream(path)
                    .pipe(res)
            }
        })
        
    }
}