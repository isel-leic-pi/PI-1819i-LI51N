'use strict'

function Person(fullname, address) {
    this.fullname = fullname
    this.address = address
}

Person.prototype.print = function() {
    console.log(this.fullname + ': ' + this.address)
}

function Student(fullname, address, nr) {
    Person.call(this, fullname, address)
    // <=> Person.apply(this, arguments) // c# Invoke(object target, object[] args)
    this.nr  = nr
}

// Student.prototype = Person.prototype // !!! PROBLEMA informação de Person = Student
// <=> Student.prototype = new Person()
Student.prototype = Object.create(Person.prototype)

Student.prototype.grades = function(){
    console.log('Very Good!')
}

const ze = new Person('Ze', 'Rua das Flores')
const maria = new Person('Maria', 'Rua da Bolivia')
const tome = new Student('Tome', 'Rua da Argentina', 76154)

ze.print()
maria.print()
tome.print()
tome.grades()
if('grades' in ze) ze.grades()
else console.log('Ze has no grades!')