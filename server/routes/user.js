const express = require('express')
const {
    fetchUsers,
    registerUser,
    validateUserRegister,
    fetchUser,
    deleteUser,
    resetPassword,
    resetNewPassword,
} = require('../controllers/userController')
const auth = require('../middlewares/jwt')

// SET INSTANCE FOR EXPRESS
const router = express()

router.get('/', fetchUsers)
router.get('/:id', fetchUser)
router.post('/register', registerUser)
router.delete('/:id', auth, deleteUser)
router.post('/reset-password', resetPassword)
router.post('/verifyUser', validateUserRegister)
router.post('/:userId/:token', resetNewPassword)

// EXPORT ROUTER
module.exports = router
