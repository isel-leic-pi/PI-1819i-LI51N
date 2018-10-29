'use strict'

class Bundle {

    static init() {
        return new Bundle()
    }

    create(name, cb) {
        const id = 127
        bundles[id] = {
            'name': name,
            'books': []
        }
        cb(null, {'_id': id })
    }
    get(id, cb) {
        const bundle = bundles[id]
        if(!bundle) {
            cb({code: 404})
        } else {
            cb(null, bundle)
        }
    }
    delete(id, cb) {
        const bundle = bundles[id]
        if(!bundle) {
            cb({code: 404})
        } else {
            delete bundles[id]
            cb(null)
        }
    }
    addBook(id, pgid, cb) {
        const bundle = bundles[id]
        const book = books[pgid]
        if(!bundle || !book) {
            cb({code: 404})
        } else {
            bundle.books.push({'id': pgid, 'title': book.title})
            cb(null)
        }
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