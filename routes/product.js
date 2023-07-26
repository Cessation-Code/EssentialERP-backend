const {createProduct, getProducts, editProduct, deleteProduct} = require('../controller/product')
const router = require('express').Router()

router.route('/').get(getProducts)
router.post('/createProduct', createProduct)
router.post('/editProduct', editProduct)
router.post('/deleteProduct', deleteProduct)

module.exports = router