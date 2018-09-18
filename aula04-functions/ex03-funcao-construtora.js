'use strict'

function Person(fullname, address) {
    this.fullname = fullname
    this.address = address
}

/**
 * Student ----|> Person
 * Inherits fullname and address
 */
function Student(fullname, address, nr) {
    const args = [fullname, address]
    Person.apply(this, args) // <=> invoke(target, new Object[]{..., ...})
    this.nr = nr
    this.toString = function() { 
        return this.nr + ': ' + this.fullname 
    }
    // !!! ALERTA não retornar nada numa função construtora !!!!
}

const std = new Student('Ze Manel', 'Rua Papoilas', 6575)
console.log(std.toString())
console.log(std)
console.log(std instanceof Student)
