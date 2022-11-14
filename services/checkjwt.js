const jwt = require('jsonwebtoken')

const extractBearer = authorization => {

    if (typeof authorization !== 'string') {
        return false;
    }

    // Isolation du Bearer Token
    const matches = authorization.match(/(bearer)\s+(\S+)/i);

    return matches && matches[2];
}


exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    console.log({ 'req.headers': req.headers })
    console.log({ 'extractbearer': extractBearer(req.headers.authorization) })
    console.log("token=" + token)
    if (!token) res.status(403).json({ error: "please provide a token" })
    else {
        jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, value) => {
            if (err) res.status(500).json({ error: 'failed to authenticate token' })
            req.user = value.data
            next()
        })
    }
}