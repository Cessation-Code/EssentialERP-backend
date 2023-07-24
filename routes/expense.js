const {createExpense, getExpenses, deleteExpense, editExpense, deleteAllExpenses} = require('../controller/expense')
const router = require('express').Router()

router.route('/').get(getExpenses)
router.post('/createExpense', createExpense)
router.post('/deleteExpense', deleteExpense)
router.post('/editExpense', editExpense)
router.post('/deleteAllExpenses', deleteAllExpenses)

module.exports = router
