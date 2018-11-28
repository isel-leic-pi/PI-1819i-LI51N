'use strict'

const rp = require('request-promise')

class Bundle {

    static init(es) {
        return new Bundle(es)
    }

    /**
     * @param {{host: string, port: number, books_index: string, bundle_index: string}} es 
     */
    constructor(es){
        this.bundlesUrl = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`
        this.booksUrl = `http://${es.host}:${es.port}/${es.books_index}/book`
    }

    create(name) {
        const id = 127
        bundles[id] = {
            'name': name,
            'books': []
        }
        return Promise.resolve({ '_id': id})
    }
    get(id) {
        const bundle = bundles[id]
        return !bundle
            ? Promise.reject({statusCode: 404})
            : Promise.resolve(bundle)
    }
    delete(id) {
        const bundle = bundles[id]
        if(!bundle)
            return Promise.reject({statusCode: 404}) //cb({code: 404})
        delete bundles[id]
        return Promise.resolve() //cb(null)
    }
    addBook(id, pgid) {
        const bundle = bundles[id]
        const book = books[pgid]
        if(!bundle || !book)
            return Promise.reject({statusCode: 404}) // cb({code: 404})
        bundle.books.push({'id': pgid, 'title': book.title})
        return Promise.resolve() //cb(null)
    }
}

const bundles = {}
const books = {
    'pg132': {
        'id': '132',
        'title': 'The Art of War'
    },
    'pg2680': {
        'id': '2680',
        'title': 'Meditations',
    },
    'pg26203': {
        'id': '26203',
        'title': 'The Adventures of Tom Sawyer'
    }
}

module.exports = Bundle