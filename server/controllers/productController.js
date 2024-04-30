const _ = require('lodash')
const { Product } = require('../models/product')
const { addProductValidate } = require('../validator/product')
const cloudinary = require('../services/cloudinary')
const upload = require('../middlewares/multer')

// CREATE PRODUCT
async function addProduct(req, res) {
    try {
        const { error } = addProductValidate.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: Error,
                })
            }
            res.status(200).json({
                success: true,
                message: 'uploaded',
                data: result,
            })
        })
        // ADD PRODUCT
        const product = new Product(
            _.pick(req.body, [
                'brand',
                'ram',
                'price',
                'processor',
                'storage',
                'description',
            ])
        )

        // SAVE PRODUCT
        await product.save()

        res.status(201).json({ message: product })
    } catch (e) {
        console.log(e)
    }
}
// GET ALL PRODUCTS
async function getProducts(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 })

        if (products.length === 0)
            return res
                .status(400)
                .json({ error: 'No product available in the database' })

        res.status(200).json({ message: products })
    } catch (e) {
        console.log(e)
    }
}
// FETCH PRODUCT
async function fetchProduct(req, res) {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (product.length === 0)
            return res
                .status(400)
                .json({ error: 'No product available in the database' })

        res.status(200).json({ message: product })
    } catch (e) {
        console.log(e)
    }
}
// UPDATE PRODUCT
// DELETE PRODUCT
async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (product.length === 0)
            return res
                .status(400)
                .json({ error: 'No product available in the database' })

        res.status(200).json({ message: 'product deleted successfully' })
    } catch (e) {
        console.log(e)
    }
}

// UPDATE PRODUCT
async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, {
            $set: {
                brand: req.body.brand,
                ram: req.body.ram,
                processor: req.body.processor,
                storage: req.body.storage,
                description: req.body.description,
                price: req.body.price,
            },
        })
        if (product.length === 0)
            return res
                .status(400)
                .json({ error: 'No product available in the database' })

        res.status(200).json({ message: 'product updated successfully' })
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    addProduct,
    getProducts,
    fetchProduct,
    updateProduct,
    deleteProduct,
}
