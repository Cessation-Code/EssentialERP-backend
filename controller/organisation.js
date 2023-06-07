const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')


const deleteAllOrganisations = async (req, res) => {


    let deletedCount = await Organisation.deleteMany({})

    if(deletedCount.deletedCount == 0){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "There's no documents to be deleted"
        })
    }else {
        res.status(StatusCodes.OK).json({
            message: 'All Organisations have been deleted',
            deletedCount: deletedCount.deletedCount
        })
    }

}


module.exports = { deleteAllOrganisations }
