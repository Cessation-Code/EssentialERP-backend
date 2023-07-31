const {createOrganisation, login, generateTpipToken, createTPIP} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/login', login)
router.post('/generateTpipToken', generateTpipToken)
router.post('/createTPIP', createTPIP)



module.exports = router