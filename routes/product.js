const {createProduct, getProducts, editProduct} = require('../controller/product')
const router = require('express').Router()

router.route('/').get(getProducts)
router.post('/createProduct', createProduct)
router.post('/editProduct', editProduct)

module.exports = router