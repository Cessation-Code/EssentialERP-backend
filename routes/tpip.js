const {tpipSale, getProducts} = require('../controller/tpip')
const router = require('express').Router()

router.post('/tpipSale', tpipSale)
router.get('/getProducts', getProducts)

module.exports = router
