const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')


const createOrganisation = async(req, res) => {

    try{
        const organisation = await Organisation.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({
            organisation: {
                name: organisation.organisation_name,
                email: organisation.email,
                address: organisation.address,
                first_name: organisation.first_name,
                last_name: organisation.last_name
            },
            message: "created",
            test: "testing nodemon"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error,
        })
    } 
    
}

module.exports = {createOrganisation}















    // try{
    //     // create instance of organisation model
    //     const organisation = new Organisation(req.body);
    
    //     // Save the organisation to the database
    //     const savedOrganisation = await organisation.save();
    
    //     // Send a sucess response
    //     return res.status(201).json({
    //         message: 'Organisation created successfully',
    //         data: savedOrganisation,
    //     });
    // }   catch (error){
    //     // Handle any errors that occurred
    //     console.error(error);
    //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create organisation' });
    // }