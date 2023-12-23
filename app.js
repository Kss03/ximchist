
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload')
const db = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandingMiddleware')

const port = process.env.PORT || 3000;


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload())
app.use('/api/v1', router)
// if any errors
app.use(errorHandler)

app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public/client'));
app.use('/admin', express.static(__dirname + '/public/admin/dist'))
app.use(errorHandler)



async function server(port) {
  try {
    await db.sync();
    app.listen(port, () => console.log(`app is listening on the port: ${port}`));
  } catch (err) {
    console.log(err)
  }

} 

server(port)