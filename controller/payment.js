const Payment = require('../models/payment')
const { StatusCodes } = require('http-status-codes')

const updatePaymentInfo = async (req, res) => {

    const {order_id, token} = req.body

    const payment = await Payment.findOne({ order_id })

    if(!order_id || !token){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "failed"
        });
    }else{
        try{
            payment.token = token
            payment.save()
            res.status(StatusCodes.OK).json({
                message: "success"
            });
        }catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "failed"
            })
        }
    }

}

module.exports = { updatePaymentInfo }


