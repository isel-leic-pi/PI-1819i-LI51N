'use strict'

function Person(fullname, address) {
    this.fullname = fullname
    this.address = address
}

Person.prototype.print = function() {
    console.log(this.fullname + ': ' + this.address)
}


const ze = new Person('Ze', 'Rua das Flores')
const maria = new Person('Maria', 'Rua da Bolivia')

ze.print()
maria.print()


maria.hello = function() { console.log('HEllo da Maria !!!')} 

// <=> Person.prototype.hello = function() {console.log('Hello!!!')}
ze.constructor.prototype.hello = function() {console.log('Hello!!!')}
// !!!! ERRADO: ze.constructor.hello = function() {console.log('Hello!!!')}

ze.hello()
maria.hello()

ze.hello()
maria.hello()
