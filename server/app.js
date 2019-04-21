require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/e-commerce-test', {useNewUrlParser:true})
const cors = require('cors')

const route = require('./routes')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', route)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`)
})
// module.exports = app