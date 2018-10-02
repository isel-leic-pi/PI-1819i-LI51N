'use strict'

const net = require('net')

net
    .connect({port: 3000})
    .on('data', buffer => {
        const msg = JSON.parse(buffer.toString().replace('\n\r', ''))
        switch (msg.type) {
            case 'watching':
                onFileWatching(msg)    
                break
            case 'changed':
                onFileChanged(msg)
                break
            default:
                onUnknownMessage(msg)
        }
    })

function onFileWatching(msg) {
    console.log(`Now watching: ${msg.file}`)
}
function onFileChanged(msg) {
    const date = new Date(msg.timestamp)
    console.log(`File ${msg.file} changed: ${date}`)
}
function onUnknownMessage(msg) {
    console.log(`Unrecognized message type: ${msg.type}`)    
}
