const {updateEmployee} = require('../controller/employee')
const router = require('express').Router()

router.post('/updateEmployee', updateEmployee)

module.exports = router
