'use strict'

function bar(arg1, arg2) {
    console.log('I am Bar: ' + arg1 + ', ' + arg2)
    let str = '( this = ' + this + ', '
    for (let index = 0; index < arguments.length; index++) {
        const element = arguments[index];
        str += element + ', '
    }
    str += ')'
    console.log(str)
}

const foo = bar

console.log(bar.name) // bar 
console.log(foo.name) // bar


foo('ola')
bar(5, 7)

const obj = {}
obj.taz = bar
obj.taz(true, 'isel')