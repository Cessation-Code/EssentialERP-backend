const {createOrganisation, loginOrganisation} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/loginOrganisation', loginOrganisation)


module.exports = router