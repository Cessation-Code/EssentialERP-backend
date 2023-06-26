const {createExpense} = require('../controller/expense')
const router = require('express').Router()

router.post('/createExpense', createExpense)

module.exports = router
