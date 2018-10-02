'use strict'

const fs = require('fs')
const net = require('net')

let counter = 0

if (process.argv.length == 2) {
    throw Error('Error: No filename specified.')
}

const server = net
    .createServer(onSubscription)
    .listen(3000, () => console.log('Listening for new connections!'))

function onSubscription(socket){
    counter++ // add a client

    // Reporting.
    console.log('Subscriber connected.')
    const files = process.argv.slice(2)
    let timeout = 0
    files.forEach(filename => {
        setTimeout(() => sendMsgWatching(socket, filename), timeout)
        timeout += 100
    })
    
    // Watcher setup.
    const watchers = files
        .map(filename => fs.watch(filename, onFileChanges.bind(null, socket, filename)))

    // Cleanup.
    socket.on('close', onSocketClose.bind(null, watchers))

    socket.on('error', err => console.log('Error on client: ' + err.code))
}

function sendMsgWatching(socket, filename) {
    const msg = JSON.stringify({
        type: 'watching', 
        file: filename,
        timestamp: Date.now()
    })
    socket.write(msg + '\n\r')
}

function onFileChanges(socket, filename){
    const obj = {
        type: 'changed', 
        file: filename, 
        timestamp: Date.now()
    }
    const msg = JSON.stringify(obj) // Object => string
    socket.write(msg + '\n\r')
}

function onSocketClose(watchers){
    counter--
    console.log('Subscriber disconnected.')
    watchers.forEach(w => w.close())
    if(counter == 0){
        server.close()
    } 
}