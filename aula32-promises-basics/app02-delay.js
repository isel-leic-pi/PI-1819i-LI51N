'use strict'

function delay(timeout, success) {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            if(success)
                resolve(`RESOLVED after ${timeout} ms`)
            else
                reject(`REJECTED after ${timeout} ms`)
        }, timeout)
    })
}

delay(500, true)
    .then(console.log)
    .catch(console.log)

delay(500, false)
    .then(console.log)
    .catch(console.log)
