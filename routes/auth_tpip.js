const {createTPIP, getTPIP} = require('../controller/auth_tpip')
const router = require('express').Router()


router.post('/createTPIP', createTPIP)
router.get('/getTPIP', getTPIP)


module.exports = router