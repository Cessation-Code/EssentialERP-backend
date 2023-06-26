const {createTPIP} = require('../controller/tpip')
const router = require('express').Router()

router.post('/createTPIP', createTPIP)

module.exports = router
