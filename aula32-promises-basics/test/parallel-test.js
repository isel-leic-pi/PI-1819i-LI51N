'use strict'

const expect = require('chai').expect

describe('Test parallel function', () => {

    it('Should execute two tasks with success', done => {
        const tasks = [
            () => new Promise((resolve) => 
                setTimeout(() => resolve('one'), 200)),
            () => new Promise((resolve) => 
                setTimeout(() => resolve('two'), 100)),
        ]
        const prms = tasks.map(t => t())
        Promise
            .all(prms)
            .then(results => {
                expect(results)
                    .to.be.an('array')
                    .with.length(2)
                expect(results[0]).to.equal('one')
                expect(results[1]).to.equal('two')
                done()
            })
    })
})
