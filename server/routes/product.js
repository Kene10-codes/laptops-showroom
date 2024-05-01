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
const router = express()

router.get('/', getProducts)
router.get('/:id', fetchProduct)
router.post('/add-product', [auth, upload.array('file', 2)], addProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)

module.exports = router
