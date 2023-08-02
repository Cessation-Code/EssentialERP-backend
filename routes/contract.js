const {createContract, deleteContract, getContracts} = require('../controller/contract')
const router = require('express').Router()

router.post('/getContracts', getContracts)
router.post('/createContract', createContract)
router.post('/deleteContract', deleteContract)

module.exports = router
