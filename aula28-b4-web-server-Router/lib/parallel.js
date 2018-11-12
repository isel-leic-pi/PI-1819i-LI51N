'use strict'

module.exports = parallel

/**
 * 
 * @param {Array} tasks Each element is a function (cb) => void
 * @param {*} cb Callback function: (err, results) => void. Parameter results is an 
 * array where each element is the result of the corresponding task in parameter tasks.
 */
function parallel(tasks, cb){
    let count = 0
    const res = []
    tasks.forEach((task, i) => {
        task((err, data) => {
            if(err) 
                return cb(err)
            res[i] = data
            count++
            if(count == tasks.length){
                cb(null,res)
            }
        })
    })
}