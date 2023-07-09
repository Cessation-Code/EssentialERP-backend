const Employee = require('../models/employee')
const { StatusCodes } = require('http-status-codes');

// get employee info
const getEmployee = async (req,res) => {
    res.status(StatusCodes.OK).json(req.employee)
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


module.exports = { updateEmployee, getEmployee }
