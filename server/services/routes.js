const morgan = require('morgan')
const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('../routes/user')
const productRoutes = require('../routes/product')

module.exports = function (app) {
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))

    // API ROUTES
    // USER ROUTE
    app.use('/api/user', userRoutes)

    // PRODUCT ROUTE
    app.use('/api/product', productRoutes)
}
