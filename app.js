const express = require('express');
const morgan = require('morgan');
const todoRoutes = require('./routes/todo')
const ExpressError = require('./expressErrors')

const app = express();

app.use(morgan('dev'));


app.listen(3000, () => {
    console.log('Server Running on port 3000')
})