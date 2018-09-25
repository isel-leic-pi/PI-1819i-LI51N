'use strict'

let stop = false

setTimeout(() => stop = true, 1000) // 1000 ms

checkStop()

function checkStop() {
    if(!stop) {
        console.log('Waiting...')
        setTimeout(checkStop, 100)
    }    
}
