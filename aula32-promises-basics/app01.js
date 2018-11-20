'use strict'

const ok = Promise.resolve().then(() => 5)
const err =  Promise.resolve().then(() => { throw Error('Invalid result!')})

const ok2 = (async () => 7)()
const err2 = (async () => { throw Error('Bad  result!')})()

fwdResult(ok)
fwdResult(ok2)
fwdResult(err)
fwdResult(err2)

function fwdResult(prm) {
    prm
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
}
