const EventEmitter = require('events').EventEmitter

class StreamJsonParser extends EventEmitter {
    constructor(socket) {
        super()
        let buffer = ''
        socket.on('data', data => {
            buffer += data
            let boundary = buffer.indexOf('\n\r')
            while (boundary >= 0) {
                const input = buffer.substring(0, boundary)
                buffer = buffer.substring(boundary + 2)
                this.emit('message', JSON.parse(input))
                boundary = buffer.indexOf('\n\r')
            }
        })
    }
    static connect(socket) {
        return new StreamJsonParser(socket)
    }
}

module.exports = StreamJsonParser

// function StreamJsonParser(socket) {
//     EventEmitter.call(this) // call super constructor
//     let buffer = ''
//     socket.on('data', data => {
//         buffer += data
//         let boundary = buffer.indexOf('\n\r')
//         while (boundary >= 0) {
//             const input = buffer.substring(0, boundary)
//             buffer = buffer.substring(boundary + 2)
//             this.emit('message', JSON.parse(input))
//             boundary = buffer.indexOf('\n\r')
//         }
//     })

// }
// // Inherits base type methods
// StreamJsonParser.prototype = Object.create(EventEmitter.prototype)

// StreamJsonParser.connect = function(socket) {
//     return new StreamJsonParser(socket)
// }
