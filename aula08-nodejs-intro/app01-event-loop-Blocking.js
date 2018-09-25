'use strict'

let stop = false

setTimeout(() => stop = true, 1000) // 1000 ms

while(!stop) {
    console.log('Waiting...')
}