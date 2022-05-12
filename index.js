const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())
require('dotenv').config();

app.get('/', (req,res) => {
    res.send('Doctors portal server is running...')
});

app.listen(port, (req,res) => {
    console.log('Listening to port: ',port);
})