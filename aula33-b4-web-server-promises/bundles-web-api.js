'use strict'

// const Bundle = require('./lib/bundle')
const Bundle = require('./lib/bundle-mock')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundle = Bundle.init(es)

module.exports = (app) => {
    app.post('/api/bundle', postBundle)
    app.get('/api/bundle/:id', getBundle)
    app.use(resourceNotFond)
    app.use(errorHandler)

    function postBundle(req, resp, next) {
        const name = req.query.name
        bundle
            .create(name)
            .then(data => resp.json(data))
            .catch(next)
    }
    function getBundle(req, resp, next) {
        const id = req.params.id
        bundle
            .get(id)
            .then(bundle => resp.json(bundle))
            .catch(next)
    }
    function resourceNotFond(req, resp, next) {
        next({
            'statusCode': 404,
            'error': 'Resource Not Found!'
        })
    }
    function errorHandler(err, req, res, next) {
        res.statusCode = err.statusCode
        res.end(err.error)
    }
}

