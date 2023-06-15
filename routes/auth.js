const {createOrganisation, loginOrganisation, createEmployee, loginEmployee} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/loginOrganisation', loginOrganisation)
router.post('/createEmployee', createEmployee)
router.post('/loginEmployee', loginEmployee)


module.exports = router