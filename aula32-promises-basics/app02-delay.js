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

const prm = delay(2000, true) // Pending
const fail = delay(2000, false) // Pending
// forwardPromise(prm)
asyncForward(fail)
console.log('Begin delays...')

async function asyncForward(prm) {
    try{
        const str = await prm
        const nr = str.length
        console.log('Number = ' + nr)
    }
    catch(err) {
        console.log(err)
    }
}


function forwardPromise(prm) {
    prm
        .then(str => str.length) // Resolved
        .then(nr => 'Number = ' + nr) // Resolved
        .then(console.log)
        .catch(console.log)
}


