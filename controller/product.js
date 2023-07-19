const Product = require('../models/product')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {

    const { organisation_id, price, name, stock, description, created_by } = req.body
    const created_at = new Date();

    // check if organisation exists
    const organisation = await Organisation.findOne({ _id: organisation_id }).catch(error => {
        console.log(error);
    });

    if (!organisation_id || !price || !name || !stock || !description || !created_by || !organisation) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Product.create({
                organisation_id: organisation_id,
                price: price,
                name: name,
                stock: stock,
                description: description,
                created_at: created_at,
                created_by: created_by,
                modified_at: created_at,
                modified_by: created_by,

            })
            res.status(StatusCodes.OK).json({
                message: "product added successfully"
            })
        } catch (error) {
            if (error.code == 11000) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "This product name is already being used"
                })
            } else {
                res.status(StatusCodes.EXPECTATION_FAILED).json({
                    message: "An error occured please try again"
                })
            }
        }

    }
}

const checkStockJob = async () => {
    try{
        // Fetch organisations
        const organisationsData = await Organisation.find().catch(error => {console.log(error)});
        const organisations = Object.values(organisationsData);
        // console.log(organisations);

        if (!organisations){
            console.log("No organisations found");
            return;
        }else{
            // Loop through organisations
            for (const org of organisations){
                // Fetch products for each organisation
                const productsData = await Product.find({organisation_id: org._id}).catch(error => {console.log(error)});
                const products = Object.values(productsData);
                // console.log(products);
                if (!products){
                    console.log(`No products found for ${org.name}`);
                }
    
                // Loop through products
                for (const product of products){
                    // Check if stock is less than 10
                    if (product.stock < 10){
                        // Send email to organisation
                        console.log(`Stock for ${product.name} is less than 10`);
                    }
                }
            }
        }

    }catch (error){
        console.log(error);
    }
}

module.exports = { createProduct, checkStockJob }