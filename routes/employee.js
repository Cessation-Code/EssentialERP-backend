const {updateEmployee, getEmployee, deleteEmployee} = require('../controller/employee')
const router = require('express').Router()

router.route('/').get(getEmployee)
router.post('/updateEmployee', updateEmployee)
router.post('/deleteEmployee', deleteEmployee)

module.exports = router
