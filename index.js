const express = require("express");
const bodyParser = require("body-parser");

require('dotenv').config()

const app = express()
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('./src/controllers/admincontroller')(app);
require('./src/controllers/storecontroller')(app);
//  require('./src/controllers/commoncontroller')(app);

app.listen(PORT, () =>{console.log(`Our app is running on port ${ PORT }`);});