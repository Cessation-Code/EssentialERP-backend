const {createOrganisation, login} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/login', login)


module.exports = router