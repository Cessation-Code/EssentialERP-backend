const {createProduct, getProducts} = require('../controller/product')
const router = require('express').Router()

router.route('/').get(getProducts)
router.post('/createProduct', createProduct)

module.exports = router