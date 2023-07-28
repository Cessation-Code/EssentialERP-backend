require('dotenv').config();
const express = require('express')
const app = express();
const connectDB = require('./database/connect');
const port = process.env.PORT;
const authRouter = require('./routes/auth')
const organisationRouter = require('./routes/organisation')
const employeeRouter = require('./routes/employee')
const paymentRouter = require('./routes/payment')
const expenseRouter = require('./routes/expense')
const saleRouter = require('./routes/sale')
const tpipRouter = require('./routes/tpip')
const productRouter = require('./routes/product')
const errorHandler = require('./middleware/error-handler')
const authenticateRequest = require('./middleware/authorization')
const timeout = require('connect-timeout');
const cron = require('node-cron');
const productController = require('./controller/product');


// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit');

// Packages usage
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(timeout('10000')); // Timeout duration in milliseconds (e.g., 10000 ms = 10 seconds)


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/organisation', organisationRouter)
app.use('/api/v1/employee', authenticateRequest, employeeRouter)
app.use('/api/v1/expense', authenticateRequest, expenseRouter)
app.use('/api/v1/sale', authenticateRequest ,saleRouter)
app.use('/api/v1/tpip', tpipRouter)
app.use('/api/v1/product', authenticateRequest, productRouter)
app.use('/api/v1/payment', paymentRouter)


app.get('/', (req, res) => {
  res.status(200).send("<h1>Hello World!</h1>")
});


// error handlers
app.use(errorHandler)

// cron job
cron.schedule('* * * * * *', ()=>{productController.checkStockJob()});

async function run() {
  try {
    // Connect the client to the server
    await connectDB(process.env.MONGO_URI || 8000);
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

run()
