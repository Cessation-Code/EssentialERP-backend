const {updatePaymentInfo} = require('../controller/payment')
const router = require('express').Router()

router.post('/updatePaymentInfo', updatePaymentInfo)

module.exports = router