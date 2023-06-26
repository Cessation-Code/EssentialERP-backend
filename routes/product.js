const {createProduct} = require('../controller/product')
const router = require('express').Router()

router.post('/createProduct', createProduct)

module.exports = router