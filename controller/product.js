const Product = require('../models/product')
const Organisation = require('../models/organisation')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {

    const { price, name, stock, description } = req.body
    const created_at = new Date();

    if (!price || !name || !stock || !description) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            await Product.create({
                organisation_id: req.employee.organisation_id,
                price: price,
                name: name,
                stock: stock,
                description: description,
                created_at: created_at,
                created_by: req.employee.employee_id,
                modified_at: created_at,
                modified_by: req.employee.employee_id,

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
    try {
        // Fetch organisations
        const organisationsData = await Organisation.find().catch(error => { console.log(error) });
        const organisations = Object.values(organisationsData);
        // console.log(organisations);

        if (!organisations) {
            console.log("No organisations found");
            return;
        } else {
            // Loop through organisations
            for (const org of organisations) {
                // Fetch products for each organisation
                const productsData = await Product.find({ organisation_id: org._id }).catch(error => { console.log(error) });
                const products = Object.values(productsData);
                // console.log(products);
                if (!products) {
                    console.log(`No products found for ${org.name}`);
                }

                // Loop through products
                for (const product of products) {
                    // Check if stock is less than 10
                    if (product.stock < 10) {
                        // Send email to organisation
                        console.log(`Stock for ${product.name} is less than 10`);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}


const getProducts = async (req, res) => {

    const organisation_id = req.employee.organisation_id;

    try{
        await Product.find({ organisation_id: organisation_id }).then((products) => {
            res.status(StatusCodes.OK).json({
                message: "products fetched successfully",
                products: products
            })
        })
    }catch(error){
        res.status(StatusCodes.EXPECTATION_FAILED).json({
            message: "An error occured please try again"
        })
    }
}

const editProduct = async (req, res) => {
    const { _id, price, name, stock, description } = req.body

    // make sure all none of the request body params are empty
    if (!_id || !price || !name || !stock || !description) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Bad Request"
        })
    } else {
        try {
            // update product record
            await Product.updateOne({ _id: _id }, {
                price: price,
                name: name,
                stock: stock,
                description: description,
                modified_at: new Date(),
                modified_by: req.employee.employee_id
            })
            res.status(StatusCodes.OK).json({
                message: "product updated successfully"
            })
        } catch (error) {
            res.status(StatusCodes.EXPECTATION_FAILED).json({
                message: "An error occured please try again"
            })
        }

    }
        
}

module.exports = { createProduct, checkStockJob, getProducts, editProduct }