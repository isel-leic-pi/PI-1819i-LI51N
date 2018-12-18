'use strict'

const rp = require('request-promise')

class Auth {

    /**
     * @param {{host: string, port: number}} es 
     */
    constructor(es){
        this.usersRefresh = `http://${es.host}:${es.port}/users/_refresh`
        this.usersUrl = `http://${es.host}:${es.port}/users/user`
    }

    async createUser(fullname, username, password) {
        const user = { fullname, username, password}
        const options = {
            'uri': this.usersUrl,
            'json': true,
            'body': user
        }
        const resp = await rp.post(options)
        await rp.post(this.usersRefresh)
        user._id = resp._id
        return user
    }
}
