require('dotenv').config();
const express = require('express')
const app = express();
const connectDB = require('./database/connect');
const port = process.env.PORT;
const authRouter = require('./routes/auth')


// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


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


app.use('/api/v1/auth', authRouter)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function run() {
  try {
    // Connect the client to the server
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

run()
