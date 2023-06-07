const {deleteAllOrganisations} = require('../controller/organisation')
const router = require('express').Router()


router.post('/deleteAllOrganisations', deleteAllOrganisations)

module.exports = router