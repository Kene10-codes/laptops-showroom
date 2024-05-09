const express = require('express')
const auth = require('../middlewares/jwt')
const admin = require('../middlewares/admin')
const {
    addProduct,
    getProducts,
    fetchProduct,
    deleteProduct,
    updateProduct,
    paginateProducts,
} = require('../controllers/productController')
const upload = require('../middlewares/multer')

const router = express()

router.get('/', getProducts)
router.get('/:id', fetchProduct)
router.get('/paginate', paginateProducts)
router.put('/:id', [auth, admin], updateProduct)
router.delete('/:id', [auth, admin], deleteProduct)
router.post('/add-product', [auth, admin, upload.array('file', 2)], addProduct)

module.exports = router
