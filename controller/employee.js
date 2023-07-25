const Employee = require('../models/employee')
const Contract = require('../models/contract')
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
                contract: {contract},
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
    const { _id, first_name, last_name, email, password, phone_number_1, phone_number_2, portal_access, hr_management, inventory, finance, tpip } = req.body;

    // search for employee
    const employee = await Employee.findOne({ _id })

    if (!employee) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Employee not found",
        })

    } else {

        // update all fields
        employee.portal_access = portal_access;
        employee.hr_management = hr_management;
        employee.inventory = inventory;
        employee.finance = finance;
        employee.tpip = tpip;
        employee.first_name = first_name
        employee.last_name = last_name
        employee.email = email
        employee.password = password
        employee.phone_number_1 = phone_number_1
        employee.phone_number_2 = phone_number_2

        try {
            // save and send successful response
            await employee.save()
            res.status(StatusCodes.OK).json({
                employee: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    portal_access: portal_access,
                    hr_management: hr_management,
                    inventory: inventory,
                    finance: finance,
                    tpip: tpip
                },
                message: "Employee updated successfully",
            })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad Request"
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


module.exports = { updateEmployee, getEmployees, deleteEmployee, createEmployee, getEmployee }
