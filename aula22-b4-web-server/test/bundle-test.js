'use strict'

const expect = require('chai').expect
const should = require('chai').should()
const Bundle = require('./../lib/bundle-mock')

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

    it('Should create a new bundle', done => {
        const bundle = Bundle.init(es)
        bundle.create('foo', (err, resp) => {
            should.not.exist(err)
            should.exist(resp)
            expect(resp)
                .to.be.an('object')
                .and.have.a.property('_id')
            bundle.get(resp._id, (err, b) => {
                expect(b)
                .to.be.an('object')
                .and.have.a.property('name', 'foo')
                bundle.delete(resp._id, (err) =>{
                    should.not.exist(err)
                    done()
                })
            })
        })      
    })
    it('Should add a book to an existing bundle', done => {
        const bundle = Bundle.init(es)
        bundle.create('Action', (err, resp) => {
            should.not.exist(err)
            should.exist(resp)
            const id = resp._id
            bundle.addBook(id, 'pg26203', (err) => {
                should.not.exist(err)
                bundle.get(id, (err, actionBooks) => {
                    should.not.exist(err)
                    should.exist(actionBooks)
                    expect(actionBooks.books)
                        .to.be.an('array')
                        .with.length(1)
                    expect(actionBooks.books[0])
                        .to.have.a.property('title', 'The Adventures of Tom Sawyer')
                    done()
                })    
            })
        })
    })
})