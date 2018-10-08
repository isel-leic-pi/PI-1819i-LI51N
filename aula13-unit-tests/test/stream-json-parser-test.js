'use strict'

const expect = require('chai').expect
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
            expect(message)
                .to.be.an('object')
                .and.have.a.property('foo', 'bar')
            done()
        })
        stream.emit('data', '{"foo":"bar"}\n\r')
    })
    it('should emit a message event from a JSON string splitted in 2 data events', done => {
        client.on('message', message => {
            expect(message)
                .to.be.an('object')
                .and.have.a.property('foo', 'bar')
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
                expect(message)
                    .to.be.an('object')
                    .and.have.a.property('foo', msg1.foo)
                first = false
            } else {
                expect(message)
                    .to.be.an('object')
                    .and.have.a.property('foo', msg2.foo)
                done()
            }
        })
        stream.emit('data', '{"foo":"bar"}\n\r{"foo":"zas"}\n\r')
    })
})