const http = require('http')

const bag = {
    items: ['iphone', 'laptop', 'bike'],
    total: 1750
}

const app = (req, res) => {
    console.log(req.headers.cookie)
    ////////////////////////////////////////////////////
    res.writeHead(200, [
        ['Set-Cookie', 'username=fmcarvalho'],
        ['Set-Cookie', 'bag=' + JSON.stringify(bag)]
    ])
    res.end()
}

const server = http.createServer(app)
server.listen(3000)