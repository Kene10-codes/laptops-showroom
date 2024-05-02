module.exports = function (req, res, next) {
    const admin = req.user.isAdmin
    if (!admin)
        return res
            .status(400)
            .json({ error: 'Unauthorized, You are not an admin!' })
    next()
}
