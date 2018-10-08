'use strict'

const assert = require('assert')
const EventEmitter = require('events').EventEmitter
const StreamJsonParser = require('../lib/stream-json-parser')

describe('StreamJsonParser', () => {
    let stream
    let client

    beforeEach(() => {
        stream = new EventEmitter()
        client = new StreamJsonParser(stream)        
    })

    it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'})
            done()
        })
        stream.emit('data', '{"foo":"bar"}\n\r')
    })
    it('should emit a message event from a JSON string splitted in 2 data events', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'})
            done()
        })
        stream.emit('data', '{"foo":"b')
        process.nextTick(() => stream.emit('data', 'ar"}\n\r'))
    })
    it('should emit 2 messages events from one data event with 2 JSON objects', done => {
        const msg1 = {foo: 'bar'}
        const msg2 = {foo: 'zas'}
        let first = true
        client.on('message', message => {
            if(first) {
                assert.deepEqual(message, msg1)
                first = false
            } else {
                assert.deepEqual(message, msg2)
                done()
            }
        })
        stream.emit('data', '{"foo":"bar"}\n\r{"foo":"zas"}\n\r')
    })
})