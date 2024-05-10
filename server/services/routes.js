const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('../routes/user')
const productRoutes = require('../routes/product')
const paginateRoutes = require('../routes/paginate')

module.exports = function (app) {
    app.use(
        cors({
            origin: ['http://localhost:8080'],
        })
    )
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

    // PAGINATE PRODUCT
    app.use('/api/paginate', paginateRoutes)
}
