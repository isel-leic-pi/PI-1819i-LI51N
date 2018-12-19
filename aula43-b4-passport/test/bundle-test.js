'use strict'

const expect = require('chai').expect
const should = require('chai').should()
const Bundle = require('./../lib/bundle')
// TPC: const Bundle = require('./../lib/bundle-mock')

describe('Test Bundle API', () => {

    const es = {
        host: 'localhost',
        port: '9200',
        books_index: 'books',
        bundles_index: 'bundles'
    }

    it('Should initialize a Bundle service object', done => {
        const bundle = Bundle.init(es)
        expect(bundle)
            .to.be.an('object')
            .and.have.a.property('booksUrl', 'http://localhost:9200/books/book')
        expect(bundle)
            .have.a.property('bundlesUrl', 'http://localhost:9200/bundles/bundle')
        done()
    })

    it('Should search for a book with author Twain', done => {
        const bundle = Bundle.init(es)
        bundle
            .searchBook('', 'Twain')
            .then(arr => {
                expect(arr)
                    .to.be.an('array')
                    .with.length(10)
                expect(arr[1])
                    .to.have.a.property('title', 'Editorial Wild Oats')
                done()
            })
    })

    it('Should create a new bundle', done => {
        const bundle = Bundle.init(es)
        bundle
            .create('zemanel', 'foo')
            .then(resp => {
                should.exist(resp)
                expect(resp)
                    .to.be.an('object')
                    .and.have.a.property('_id')
                const prmBundle = bundle.get(resp._id)
                const prmId = Promise.resolve(resp._id)
                return Promise.all([prmId, prmBundle])
            })
            .then(([id, b]) => {
                expect(b)
                    .to.be.an('object')
                    .and.have.a.property('name', 'foo')
                return bundle.delete(id)
            })
            .then(() => done())
            .catch(err => {
                console.log(err)
                should.not.exist(err)
                done()
            })
    })
    it('Should get all bundles from user', async () => {
        const bundle = Bundle.init(es)
        const resp = await bundle.create('zemanel', 'foo')
        should.exist(resp)
        expect(resp)
            .to.be.an('object')
            .and.have.a.property('_id')
        const arr = await bundle.getAll('zemanel')
        expect(arr)
            .to.be.an('array')
            .that.deep.include({'name': 'foo', '_id': resp._id, 'books': []})
        await bundle.delete(resp._id)
    })      
    it('Should add a book to an existing bundle', done => {
        const bundle = Bundle.init(es)
        bundle
            .create('Action')
            .then(resp => {
                should.exist(resp)
                const id = resp._id
                return bundle
                    .addBook(id, 'pg26203')
                    .then(() => bundle.get(id))
            })
            .then(actionBooks => {
                should.exist(actionBooks)
                expect(actionBooks.books)
                    .to.be.an('array')
                    .with.length(1)
                expect(actionBooks.books[0])
                    .to.have.a.property('title', 'The Adventures of Tom Sawyer')
                done()
            })    
            .catch(err => {
                should.not.exist(err)
                done()
            })
    })
})