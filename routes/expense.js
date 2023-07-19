const {createExpense, getExpenses} = require('../controller/expense')
const router = require('express').Router()

router.route('/').get(getExpenses)
router.post('/createExpense', createExpense)

module.exports = router
