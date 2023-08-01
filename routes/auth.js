const {createOrganisation, login, generateTpipToken, createTPIP, deleteTPIP} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/login', login)
router.post('/generateTpipToken', generateTpipToken)
router.post('/createTPIP', createTPIP)
router.post('/deleteTPIP', deleteTPIP)



module.exports = router