const timestamp = require("time-stamp")
function logger(req, res, next) {
    console.log(`${ req.method } of ${ req.body } to ${ req.originalUrl } at ${ timestamp(`MM-DD-YYYY HH:mm:ss:ms`) }`)
    next()
}

module.exports = logger