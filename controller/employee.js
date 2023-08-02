const Employee = require('../models/employee')
const Contract = require('../models/contract')
const Organisation = require('../models/organisation')
const Sale = require('../models/sale')
const Product = require('../models/product')
const Expense = require('../models/expense')
const { StatusCodes } = require('http-status-codes');

// create employee
const createEmployee = async (req, res) => {
    const { first_name, last_name, email, password, phone_number_1, phone_number_2, role, portal_access, inventory, hr_management, finance, tpip, description, salary, end_date } = req.body;
    if (!first_name || !last_name || !email || !password || !phone_number_1 || !role || !salary) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please fill in all fields"
        })
    } else {
        try {
            const employee = await Employee.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone_number_1: phone_number_1,
                phone_number_2: phone_number_2,
                organisation_id: req.employee.organisation_id,
                role: role,
                portal_access: portal_access,
                inventory: inventory,
                hr_management: hr_management,
                finance: finance,
                tpip: tpip
            })
            const contract = await Contract.create({
                employee_id: req.employee.employee_id,
                role: role,
                description: description,
                salary: salary,
                status: "Active",
                start_date: new Date(),
                end_date: !end_date ? "" : end_date
            })
            res.status(StatusCodes.CREATED).json({
                employee: {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    email: employee.email,
                    organisation_id: employee.organisation_id,
                    portal_access: employee.portal_access,
                    tpip: employee.tpip,
                    hr_management: employee.hr_management,
                    inventory: employee.inventory,
                    finances: employee.finance
                },
                contract: { contract },
                message: "created"
            })
        } catch (error) {
            if (error.code == 11000) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'This email has already been used, choose a new one'
                })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: error.message
                })
            }
        }
    }
}

// get EMPLOYEE (SINGLE) info
const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.employee.employee_id })
        res.status(StatusCodes.OK).json({
            message: "employee retrieved successfully",
            employee: employee
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}


// get employees list info
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ organisation_id: req.employee.organisation_id })
        res.status(StatusCodes.OK).json({
            message: "employees retrieved successfully",
            employees: employees
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}


// do create the various accesses
const updateEmployee = async (req, res) => {

    // save properties of request body as constansts
    const { _id, first_name, last_name, email, phone_number_1, phone_number_2, portal_access, hr_management, inventory, finance, tpip } = req.body;

    // search for employee
    const employee = await Employee.findOne({ _id })

    if (!employee) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Employee not found",
        })

    } else {
        // update all fields
        const updateObject = {
            portal_access: true,
            hr_management: hr_management,
            inventory: inventory,
            finance: finance,
            tpip: tpip,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number_1: phone_number_1,
            phone_number_2: phone_number_2,
        };


        try {
            // save and send successful response
            await employee.updateOne(updateObject);
            res.status(StatusCodes.OK).json({
                employee: updateObject,
                message: "Employee updated successfully",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad Request"
            })
            console.log(error)
        }

    }

}

const changePassword = async (req, res) => {
    const { employee_id, password } = req.body;
    console.log(req.body)
    if (!employee_id || !password || password.length < 8 || password == null) {
        res.status(StatusCodes.BAD_REQUEST)
    } else {
        const isAdmin = (req.employee.employee_id == employee_id)
        if (!isAdmin) {
            try {
                const employee = await Employee.findOne({ _id: employee_id })
                employee.password = password
                await employee.save()
                res.status(StatusCodes.OK).json({
                    message: "Password changed successfully"
                })
            } catch (error) {
                console.log(error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                })
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You are not authorized to perform this action"
            })
        }

    }
}

const deleteEmployee = async (req, res) => {

    // save properties of request body as constansts
    const { employee_id } = req.body;

    // search for employee
    const employee = await Employee.findOne({ employee_id })

    if (!employee) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Employee not found",
        })

    } else {

        try {
            // delete employee
            await employee.delete()
            res.status(StatusCodes.OK).json({
                message: "Employee deleted successfully",
            })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad Request"
            })
        }

    }

}


const getDashboardData = async (req, res) => {

    try {
        const expenses = await Expense.find({ organisation_id: req.employee.organisation_id })
        const sales = await Sale.find({ organisation_id: req.employee.organisation_id })
        const products = await Product.find({ organisation_id: req.employee.organisation_id })
        res.status(StatusCodes.OK).json({
            expenses: expenses,
            sales: sales,
            products: products
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }

}

const getFinanceInfo = async (req, res) => {
    try {
        const expenses = await Expense.find({ organisation_id: req.employee.organisation_id })
        const sales = await Sale.find({ organisation_id: req.employee.organisation_id })
        res.status(StatusCodes.OK).json({
            expenses: expenses,
            sales: sales
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

module.exports = { updateEmployee, getEmployees, deleteEmployee, createEmployee, getEmployee, changePassword, getDashboardData, getFinanceInfo }
