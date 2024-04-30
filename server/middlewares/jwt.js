const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // ACCESS TOKEN
    const token = req.header('x-auth-token')

    if (!token) return res.status(400).json({ error: 'No token provided!' })

    try {
        // VERIFY TOKEN PROVIDED
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = decodedToken
        next()
    } catch (e) {
        console.log(e.message)
    }
}
