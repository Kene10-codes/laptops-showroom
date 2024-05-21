const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const userRoutes = require('../routes/user')
const cookieParser = require('cookie-parser')
const swaggerUI = require('swagger-ui-express')
const productRoutes = require('../routes/product')
const paginateRoutes = require('../routes/paginate')
const swaggerSpec = require('../configuration/swagger')

module.exports = function (app) {
    app.use(
        cors({
            origin: [
                'http://localhost:8080',
                'http://localhost:3100',
                'http://localhost:3000',
            ],
        })
    )
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(
        session({
            resave: false,
            saveUninitialized: true,
            secret: process.env.COOKIE_KEY,
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(express.json({ limit: '10MB' }))
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    // API ROUTES
    // USER ROUTE
    app.use('/api/user', userRoutes)

    // PRODUCT ROUTE
    app.use('/api/product', productRoutes)

    // PAGINATE PRODUCT
    app.use('/api/paginate', paginateRoutes)
}
