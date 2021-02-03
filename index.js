const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT } = require('./config/config');
const connect = require('./config/connection');


const app = express();

// middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//end points 
app.use('/',require('./routes/base.route'));

connect();

//server start
app.listen(PORT,()=>console.log(`Server is listening  on http://localhost:${PORT}`));