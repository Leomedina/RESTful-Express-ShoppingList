const express = require('express');
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoutes');
const ExpressError = require('./utils/expressErrors');

const app = express();

app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use("/items", itemRoutes);

//Catches 404 errors and sends them to the error handler
app.use((req, res, next) => {
    const err = new ExpressError("Page Not Found", 404);
    next(err);
});

//Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server Error";

    return res.status(status).json({
        error: { message, status },
    });
});
 
module.exports = app;