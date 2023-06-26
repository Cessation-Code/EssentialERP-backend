const {createSale} = require('../controller/sale')
const router = require('express').Router()

router.post('/createSale', createSale)

module.exports = router
