const express = require('express')
const passport = require('passport')
const {
    fetchUsers,
    registerUser,
    validateUserRegister,
    fetchUser,
    deleteUser,
    resetPassword,
    resetNewPassword,
    authLogin,
} = require('../controllers/userController')
const auth = require('../middlewares/jwt')

// SET INSTANCE FOR EXPRESS
const router = express()

router.get('/', fetchUsers)
router.get('/:id', fetchUser)
router.post('/login', authLogin)
router.post('/register', registerUser)
router.delete('/:id', auth, deleteUser)
router.post('/reset-password', resetPassword)
router.post('/verifyUser', validateUserRegister)
router.post('/:userId/:token', resetNewPassword)

// GOOGLE ROUTES
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', function (req, res) {
        res.redirect('/')
    })
)

router.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// EXPORT ROUTER
module.exports = router
