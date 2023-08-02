const {createEmployee, updateEmployee, getEmployees, deleteEmployee, getEmployee, changePassword, getDashboardData} = require('../controller/employee')
const router = require('express').Router()

router.route('/').get(getEmployees)
router.route('/getEmployee').get(getEmployee)
router.post('/updateEmployee', updateEmployee)
router.post('/deleteEmployee', deleteEmployee)
router.post('/createEmployee', createEmployee)
router.post('/changePassword', changePassword)
router.post('/getDashboardData', getDashboardData)

module.exports = router
