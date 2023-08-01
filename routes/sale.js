const {createSale, getSales} = require('../controller/sale')
const router = require('express').Router()

router.post('/createSale', createSale)
router.get('/', getSales)

module.exports = router
