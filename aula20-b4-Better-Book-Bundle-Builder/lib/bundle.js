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
            if(err) 
                return cb(err)
            if(res.statusCode != 201) {
                return cb({
                    code: res.statusCode,
                    message: res.statusMessage,
                    error: body
                })
            }
            cb(null, body)
        })
    }
    get(id, cb) {
        const uri = `${this.bundlesUrl}/${id}`
        request.get(uri, (err, res, body) =>{
            if(err) 
                return cb(err)
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
    delete(id, cb) {
        const uri = `${this.bundlesUrl}/${id}`
        request.delete(uri, (err, res, body) =>{
            if(err) 
                return cb(err)
            if(res.statusCode != 200) {
                return cb({
                    code: res.statusCode,
                    message: res.statusMessage,
                    error: body
                })
            }
            cb(null, JSON.parse(body))
        })
    }
}

module.exports = Bundle