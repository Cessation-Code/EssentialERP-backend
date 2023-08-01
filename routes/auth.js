const {createOrganisation, login, generateTpipToken} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/login', login)
router.post('/generateTpipToken', generateTpipToken)


module.exports = router