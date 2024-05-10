const express = require('express')

const { paginateProducts } = require('../controllers/productController')

const router = express()

router.get('/', paginateProducts)

module.exports = router
