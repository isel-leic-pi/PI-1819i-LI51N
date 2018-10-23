'use strict'

const request = require('request')

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
    addBook(id, pgid, cb) {
        request.get(`${this.booksUrl}/${pgid}`, (err, res, body) => {
            if(!reportError(200, err, res, body, cb)) {
                const book = JSON.parse(body)._source
                this.get(id, (err, bundle) => {
                    if(err) return cb(err)
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