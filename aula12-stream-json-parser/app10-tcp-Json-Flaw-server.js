'use strict'

const fs = require('fs')
const net = require('net')

const server = net
    .createServer(onSocketSubscription)
    .listen(3000, console.log.bind(console, 'Flaw server listening for subscribers...'))

function onSocketSubscription(socket) {
    // Reporting.
    console.log('Subscriber connected.')

    // Two message chunks that together make a whole message.
    const firstChunk = '{"type":"changed","timesta'
    const secondChunk = 'mp":1450694370094}\n\r'
    // Send the first chunk immediately.
    socket.write(firstChunk)
    // After a short delay, send the other chunk.
    setTimeout(() => {
        socket.write(secondChunk)
        socket.end()
    }, 100)

    // Cleanup.
    socket.on('close', onSocketDisconnection)
    socket.on('error', err => console.log('ERROR: ' + err.code))
}

function onSocketDisconnection() {
    console.log('Subscriber disconnected.')
    server.close()
}

