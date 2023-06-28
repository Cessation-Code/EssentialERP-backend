const {createOrganisation, login, createEmployee} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/createEmployee', createEmployee)
router.post('/login', login)


module.exports = router