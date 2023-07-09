const {updateEmployee, getEmployee} = require('../controller/employee')
const router = require('express').Router()

router.route('/').get(getEmployee)
router.post('/updateEmployee', updateEmployee)

module.exports = router
