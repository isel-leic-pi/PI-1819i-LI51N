'use strict'

const request = require('request')
const parallel = require('./parallel')

class Bundle {

    /**
     * @param {{host: string, port: number, books_index: string, bundle_index: string}} es 
     */
    constructor(es){
        this.bundlesUrl = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`
        this.booksUrl = `http://${es.host}:${es.port}/${es.books_index}/book`
    }
    /**
     * @param {{host: string, port: number, books_index: string, bundle_index: string}} es 
     */
    static init(es) {
        return new Bundle(es)
    }

    create(name, cb) {
        const options = {
            'uri': this.bundlesUrl,
            'json': true,
            'body': { 'name': name, 'books': []}
        }
        request.post(options, (err, res, body) =>{
            if(!reportError(201, err, res, body, cb))
                cb(null, body)
        })
    }
    get(id, cb) {
        const uri = `${this.bundlesUrl}/${id}`
        request.get(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, JSON.parse(body)._source)
        })
    }
    delete(id, cb) {
        const uri = `${this.bundlesUrl}/${id}`
        request.delete(uri, (err, res, body) =>{
            if(!reportError(200, err, res, body, cb))
                cb(null, JSON.parse(body))
        })
    }

    getBook(bookId, cb) {
        request.get(`${this.booksUrl}/${bookId}`, (err, res, body) => {
            if(err) return cb(err)
            if(res.statusCode != 200) {
                return cb({
                    code: res.statusCode,
                    message: res.statusMessage,
                    error: body
                })
            }
            cb(null, JSON.parse(body)._source)
        })
    }
    
    addBook(id, pgid, cb) {
        const tasks = []
        tasks[0] = cb => this.getBook(pgid, cb)
        tasks[1] = cb => this.get(id, cb)
        parallel(tasks, (err, results) => {
            if(err) return cb(err)
            const book = results[0]
            const bundle = results[1]
            const idx = bundle.books.findIndex(b => b.id === pgid)
            if(idx >= 0) 
                // The book already exists in this bundle so we finish here
                return cb(null)
            bundle.books.push({
                'id': book.id,
                'title': book.title
            })
            const options = {
                'uri': `${this.bundlesUrl}/${id}`,
                'json': true,
                'body': bundle
            }
            request.put(options, (err, res, body) => {
                if(!reportError(200, err, res, body, cb))
                    cb(null)
            })

        })
    }
}

function reportError(statusOk, err, res, body, cb) {
    if(err) {
        cb(err)
        return true
    }
    if(res.statusCode != statusOk) {
        cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
        return true
    }
}

module.exports = Bundle