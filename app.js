require('dotenv').config();
const express = require('express');
const app = express();
const client = require('./database/connect');
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

run()
