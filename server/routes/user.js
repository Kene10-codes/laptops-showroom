const express = require('express')
const {
    fetchUsers,
    registerUser,
    validateUserRegister,
} = require('../controllers/userController')

// SET INSTANCE FOR EXPRESS
const router = express()

router.get('/', fetchUsers)
router.post('/register', registerUser)
router.post('/verifyUser', validateUserRegister)

// EXPORT ROUTER
module.exports = router
