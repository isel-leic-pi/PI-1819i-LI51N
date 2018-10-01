'use strict'

const fs = require('fs')
const net = require('net')

const filename = process.argv[2]
let counter = 0

if (!filename) {
    throw Error('Error: No filename specified.')
}

const server = net.createServer(onSubscription)

server.listen(3000)
console.log('Listening for new connections!')

function onSubscription(socket){
    counter++ // add a client

    // Reporting.
    console.log('Subscriber connected.')
    const msg = JSON.stringify({type: 'watching', file: filename, timestamp: Date.now()})
    socket.write(msg + '\n\r')

    // Watcher setup.
    const watcher = fs.watch(filename, onFileChanges.bind(null, socket))

    // Cleanup.
    socket.on('close', onSocketClose.bind(null, watcher))
}

function onFileChanges(socket){
    const obj = {
        type: 'changed', 
        file: filename, 
        timestamp: Date.now()
    }
    const msg = JSON.stringify(obj) // Object => string
    socket.write(msg + '\n\r')
}

function onSocketClose(watcher){
    counter--
    console.log('Subscriber disconnected.')
    watcher.close()
    if(counter == 0){
        server.close()
    } 
}