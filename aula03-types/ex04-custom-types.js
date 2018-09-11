'use strict'


function printProperties(obj)
{
    let str = ''
    for(let name in obj) {
        str += name + ' = '  + obj[name] + ', '
        if(typeof(obj[name]) == 'function')
            obj[name]()
    }
    console.log(str)
}

function createStudent(name, nr) {
    return {
        "name": name,
        "nr": nr,
        "print": function() {
            console.log(this.name + ": " + this.nr)
        }
    }
    
}

teste3()

function teste3() {
    const std3 = function(){ console.log("std3")}
    std3.nome = "Katty"
    std3.nr = 73164
    std3.print= function() {
        console.log(this.name + ": " + this.nr)
    }
    printProperties(std3)
    std3()
}


function teste2() {
    const std1 = createStudent("Ze Manel", 716486)
    const std2 = createStudent("maria papoila", 72145375)
    std2.address = "Rua das Papoilas"
    printProperties(std1)    
    printProperties(std2)    
}

function teste1() {
    const std1 = createStudent("Ze Manel", 716486)
    const std2 = createStudent("maria papoila", 72145375)
    std2.address = "Rua das Papoilas"

    std2.print()
    std2.name = "Nando"
    std2.print()
}

/*
console.log(typeof(std1))
console.log(typeof(std2))
console.log(typeof({}))
*/