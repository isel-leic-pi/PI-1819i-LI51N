'use strict'

const expect = require('chai').expect
const parallel = require('./../lib/parallel')

describe('Test parallel function', () => {

    it('Should execute two tasks with success', done => {
        const tasks = [
            cb => setTimeout(() => cb(null, 'one'), 200),
            cb => setTimeout(() => cb(null, 'two'), 100)
        ]
        parallel(tasks, (err, results) => {
            expect(results)
                .to.be.an('array')
                .with.length(2)
            expect(results[0]).to.equal('one')
            expect(results[1]).to.equal('two')
            done()
        })
    })
})
