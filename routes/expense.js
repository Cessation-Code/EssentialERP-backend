const {createExpense, getExpenses, deleteExpense, editExpense} = require('../controller/expense')
const router = require('express').Router()

router.route('/').get(getExpenses)
router.post('/createExpense', createExpense)
router.post('/deleteExpense', deleteExpense)
router.post('/editExpense', editExpense)

module.exports = router
