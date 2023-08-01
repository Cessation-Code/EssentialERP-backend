const {createOrganisation, login, generateTpipToken, deleteTPIP} = require('../controller/auth')
const router = require('express').Router()


router.post('/registerOrganisation', createOrganisation)
router.post('/login', login)
router.post('/generateTpipToken', generateTpipToken)
router.post('/deleteTPIP', deleteTPIP)



module.exports = router