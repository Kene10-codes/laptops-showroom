const _ = require('lodash')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const { User } = require('../models/user')
const { generateOTP } = require('../services/otp')
const {
    userRegister,
    userResetEmail,
    validateNewPassword,
} = require('../validator/user')
const { sendEmail } = require('../services/sendEmail')
const { Token } = require('../models/token')

// REGISTER USER
async function registerUser(req, res) {
    try {
        const { error } = userRegister.validate(req.body)
        if (error)
            return res.status(400).json({ error: error.details[0].message })

        // CHECK IF USER EXISTS
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser)
            return res.status(400).json({ error: 'User already exists' })

        const user = await User(
            _.pick(req.body, [
                'lastName',
                'firstName',
                'email',
                'phoneNumber',
                'password',
            ])
        )

        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        user.otp = generateOTP()

        // SAVE/UPDATE USER
        await user.save()

        // SEND EMAIL
        sendEmail(
            user,
            'Account created successfully - Verify Email',
            '',
            `<div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${user.otp}</h1>
    </div>`
        )

        // GENERATE TOKEN
        const token = user.generateToken()

        // SEND USER EMAIL
        res.cookie('emailCookie', `${user.email}`, {
            maxAge: 24 * 60 * 1000,
            httpOnly: true,
        })
        res.header('x-auth-token', token)
            .status(201)
            .json({ message: 'User created successfully' })
    } catch (e) {
        console.log(e)
    }
}

// VALIDATE USER
async function validateUserRegister(req, res) {
    try {
        const { otp } = req.body
        const email = req.cookies.emailCookie
        const user = await User.findOne({ email })
        if (!user) return { error: 'User does not exists' }

        if (user && user.otp !== otp)
            return res.status(400).json({ error: 'OTP is incorrect' })

        // CHECK FOR USER EMAIL
        // CHECK FOR OTP
        // COMPARE OTP

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: { active: true },
            },
            { new: true }
        )

        // SEND EMAIL
        sendEmail(
            user,
            'Account Successfully Verified',
            '',
            `<div
    class="container"
    style="max-width: 90%; margin: auto; padding-top: 20px"
  >
    <h2>Dear, ${updatedUser.firstNames}</h2>
    <h4>You are officially In Again ✔</h4>
    <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">You account has been successfully updated.</h1>
</div>`
        )
        res.status(200).json({ message: 'User successfully verified' })
    } catch (e) {
        console.log(e)
    }
}

// FETCH USERS
async function fetchUsers(req, res) {
    try {
        const users = await User.find()
        if (users.length === 0)
            return res
                .status(400)
                .json({ error: 'No user available in the database' })

        res.status(200).json({ message: users })
    } catch (e) {
        console.log(e)
    }
}

// FETCH USER
async function fetchUser(req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (user.length === 0)
            return res
                .status(400)
                .json({ error: 'No user available in the database' })

        res.status(200).json({ message: user })
    } catch (e) {
        console.log(e)
    }
}
// DELETE USER
async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (user.length === 0)
            return res
                .status(400)
                .json({ error: 'No user available in the database' })

        res.status(200).json({ message: 'User deleted successfully' })
    } catch (e) {
        console.log(e)
    }
}

// RESET PASSWORD FUNC
async function resetPassword(req, res) {
    try {
        const { error } = userResetEmail.validate(req.body)
        if (error)
            return res.status(400).json({ error: error.details[0].message })

        // CHECK EMAIL
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).json({ error: 'User not in our database' })

        let token = await Token.findOne({ userId: user._id })

        if (!token) {
            token = new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save()
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`

        sendEmail(
            user,
            'Reset Password',
            '',
            `<div
    class="container"
    style="max-width: 90%; margin: auto; padding-top: 20px"
  >
    <h2>Dear,</h2>
    <p style="font-size: 40px; letter-spacing: 2px; text-align:center;">Click the link to reset your password. ${link} </p>

</div>`
        )

        res.status(200).json({ message: 'Password reset initated' })
    } catch (e) {
        console.log(e)
    }
}

// VERIFY RESET PASSWORD
async function resetNewPassword(req, res) {
    try {
        const { error } = validateNewPassword.validate(req.body)
        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const user = await User.findById(req.params.userId)

        if (!user)
            return res.status(400).json({ error: 'invalid link or expired' })

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        })

        if (!token) return res.status(400).json({ error: 'Invalid token' })

        user.password = req.body.password

        await user.save()
        await Token.findByIdAndDelete({ _id: token._id })
        sendEmail(
            user,
            'Password was successfully changed',
            '',
            `<p>Dear ${user.name},</p>
            <p>Welcome to our Techie Laptops! We are thrilled to have you as a new member of our community. </p>
            <p>You have successfully changed your password</p>
    
    
           Once again, welcome aboard, and thank you for joining us! </p>
           
           <p>Best regards,</p>
           <span>Kenechukwu </span>
           <span>CEO</span>`
        )
        res.status(200).json({ message: 'Password reset was successful' })
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    fetchUsers,
    registerUser,
    validateUserRegister,
    fetchUser,
    deleteUser,
    resetPassword,
    resetNewPassword,
}
