const {createOrganisation} = require('../controller/auth')
const router = require('express').Router()


router.post('/register', createOrganisation)


module.exports = router