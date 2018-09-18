'use strict'

function makeStudent(nr, fullname) {
    return {
        nr, // <=> 'nr': nr, 
        fullname, 
        // !!!! ALERTA !!!! : toString: () => this.nr + ': ' + this.fullname
        toString: function(){ return this.nr + ': ' + this.fullname }
    }
}

const std = makeStudent(83615, 'Ze Manel')
console.log(std.toString())
console.log(std)

