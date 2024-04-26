const express = require('express')
const {
    fetchUsers,
    registerUser,
    validateUserRegister,
    fetchUser,
    deleteUser,
} = require('../controllers/userController')

// SET INSTANCE FOR EXPRESS
const router = express()

router.get('/', fetchUsers)
router.get('/:id', fetchUser)
router.delete('/:id', deleteUser)
router.post('/register', registerUser)
router.post('/verifyUser', validateUserRegister)

// EXPORT ROUTER
module.exports = router
