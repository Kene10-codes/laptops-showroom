const express = require('express')
const {
    addProduct,
    getProducts,
    fetchProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/jwt')
const admin = require('../middlewares/admin')
const router = express()

router.get('/', getProducts)
router.get('/:id', fetchProduct)
router.post('/add-product', [auth, admin, upload.array('file', 2)], addProduct)
router.put('/:id', [auth, admin], updateProduct)
router.delete('/:id', [auth, admin], deleteProduct)

module.exports = router
