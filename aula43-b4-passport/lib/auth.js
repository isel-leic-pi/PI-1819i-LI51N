'use strict'

const rp = require('request-promise')

class Auth {
    static init(es) {
        return new Auth(es)
    }

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

    getUser(userId) {
        return rp
            .get(`${this.usersUrl}/${userId}`)
            .then(body => JSON.parse(body))
            .then(obj => {return {
                '_id': obj._id,
                'fullname': obj._source.fullname,
                'username': obj._source.username,
            }})

    }
    async authenticate(username, password) {
        const url = `${this.usersUrl}/_search?q=username:${username}`
        const body = await rp.get(url)
        const obj = JSON.parse(body)
        if(obj.hits.hits.length == 0) 
            throw {'statusCode': 404, 'err': 'Username not found!' }
        const first = obj.hits.hits[0]
        if(first._source.password != password) 
            throw {'statusCode': 401, 'err': 'Wrong credentials!' }
        return {
            '_id': first._id
        }
    }

}

module.exports = Auth