'use strict'

const rp = require('request-promise')

class Bundle {

    /**
     * @param {{host: string, port: number, books_index: string, bundle_index: string}} es 
     */
    constructor(es){
        this.bundlesRefresh = `http://${es.host}:${es.port}/${es.bundles_index}/_refresh`
        this.bundlesUrl = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`
        this.booksUrl = `http://${es.host}:${es.port}/${es.books_index}/book`
    }
    /**
     * @param {{host: string, port: number, books_index: string, bundle_index: string}} es 
     */
    static init(es) {
        return new Bundle(es)
    }

    async create(userId, name) {
        const options = {
            'uri': this.bundlesUrl,
            'json': true,
            'body': { 'user_id': userId, 'name': name, 'books': []}
        }
        const resp = await rp.post(options)
        await rp.post(this.bundlesRefresh)
        return resp
    }

    getAll(userId) {
        const query = `user_id:${userId}`
        const url = `${this.bundlesUrl}/_search?q=${query}`
        return rp
            .get(url)
            .then(body => JSON.parse(body).hits.hits)
            .then(arr => arr.map(item => { return {
                '_id': item._id,
                'name': item._source.name,
                'books': item._source.books
            }}))

    }

    get(id) {
        const uri = `${this.bundlesUrl}/${id}`
        return rp
            .get(uri)
            .then(body => JSON.parse(body)._source)
    }
    delete(id) {
        const uri = `${this.bundlesUrl}/${id}`
        return rp
            .delete(uri)
            .then(body => JSON.parse(body))
    }

    searchBook(title, authors) {
        if(!title) title = '*'
        if(!authors) authors = '*'
        const query = `(title:${title})AND(authors:${authors})`
        return rp
            .get(`${this.booksUrl}/_search?q=${query}`)
            .then(body => JSON.parse(body).hits.hits.map(b => b._source))
    }
    getBook(bookId) {
        return rp
            .get(`${this.booksUrl}/${bookId}`)
            .then(body => JSON.parse(body)._source)
    }
    
    addBook(id, pgid) {
        return Promise
            .all([this.getBook(pgid), this.get(id)])
            .then(([book, bundle]) =>  addBookToBundle(id, pgid, book, bundle))
            .then(([id, bundle]) => this.updateBundle(id, bundle))
    }

    updateBundle(id, bundle){
        if(!id) return
        const options = {
            'uri': `${this.bundlesUrl}/${id}`,
            'json': true,
            'body': bundle
        }
        return rp
            .put(options)
    }
    
}

/**
 * Return an array with [id, bundle] or undefined if the book
 * already exists in the bundle.
 * 
 * @param {*} id Bundle id
 * @param {*} pgid Project gutenberg id
 * @param {*} book 
 * @param {*} bundle 
 */
function addBookToBundle(id, pgid, book, bundle) {
    const idx = bundle.books.findIndex(b => b.id === pgid)
    if(idx >= 0) 
        // The book already exists in this bundle so we finish here
        return
    bundle.books.push({
        'id': book.id,
        'title': book.title
    })
    return [id, bundle]
}

module.exports = Bundle