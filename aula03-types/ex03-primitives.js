'use strict'

function printType(val) {
    const str = typeof(val)
    console.log(str)
}

printType('ola')
printType(723)
printType(true)
printType()
printType(new Object())
printType(printType)
printType({})
