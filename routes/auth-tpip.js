const {createTPIP, getTPIP, deleteTPIP} = require('../controller/auth_tpip')
const router = require('express').Router()


router.post('/createTPIP', createTPIP)
router.get('/getTPIP', getTPIP)
router.post('/deleteTPIP', deleteTPIP)


module.exports = router