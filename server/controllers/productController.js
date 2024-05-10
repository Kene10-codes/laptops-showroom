const _ = require('lodash')
const { Product } = require('../models/product')
const cloudinary = require('../services/cloudinary')
const { getPagination } = require('../middlewares/paginate')
const { addProductValidate } = require('../validator/product')

// CREATE PRODUCT
async function addProduct(req, res) {
    try {
        const { error } = addProductValidate.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        // UPLOAD PRODUCT IMAGES TO CLOUDINARY
        const urls = []
        const files = req.files

        let result
        for (const file of files) {
            const { path } = file
            result = await cloudinary.uploader.upload(path)
            urls.push(result.url)
        }

        if (!result)
            return res.status(400).json({ error: 'Upload was not successful' })

        res.status(200).json({ message: result })

        // ADD PRODUCT
        const product = new Product({
            brand: req.body.brand,
            ram: req.body.ram,
            price: req.body.price,
            processor: req.body.processor,
            storage: req.body.storage,
            description: req.body.description,
            photos: urls,
        })

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

// QUERY, SORT AND SEARCH PRODUCTS
async function paginateProducts(req, res) {
    try {
        // RESPONSE QUERY
        const { page, limit, search, sort } = req.query

        const { skip, sorted, limitSize, searched } = getPagination(
            page,
            limit,
            search,
            sort
        )

        const products = await Product.find({
            brand: { $regex: searched, $options: 'i' },
        })
            .sort(sorted)
            .skip(skip)
            .limit(limitSize)
        res.status(200).json({ message: products })
    } catch (e) {
        res.status(500).json({ error: true, message: e.message })
    }
}

// MODULE EXPORTS
module.exports = {
    addProduct,
    getProducts,
    fetchProduct,
    updateProduct,
    deleteProduct,
    paginateProducts,
}
