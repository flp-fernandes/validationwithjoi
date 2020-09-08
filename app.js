const express = require('express');
const logger = require('morgan');
const Joi = require('joi');

const app = express();
const PORT = process.env.NODE_ENV || 5000;
const Routes = require('./routes');

// app configurations
app.set('port', PORT);

// load app middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// load api routes
app.use('/', Routes);

// next() express use test
app.get('/next', (req, res, next) => {
    console.log('next 1');
    next();
})

app.get('/next', (req, res) => {
    console.log('next 2');
    res.send({})
})

// testing joi validation
app.post('/test', (req, res) => {
    //getch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
        // email is required
        // email must be a valid email string
        email: Joi.string().email().lowercase().required(),

        // phone is required
        // and must be a string of the format xxx-xxx-xxxx
        // where X is a digit (0-9)
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),

        // birthday is not required
        // birthday must be a valid ISO-8601 date
        // dates berofe Jan 1, 2014 are not allowed
        birthday: Joi.date().max('1-1-2004').iso()
    });
    
    // validate the request data against the schema
    const { error, value } = schema.validate(data);
    
    // create a random number as id
    const id = Math.ceil(Math.random() * 9999999);

    if (error) {
        // send 422 error response if validation fails
        res.status(422).send({
            status: 'error',
            message: 'Invalid request data',
            data: data
        })
    } else {
        // send a success response if validation passes
        // attach the random ID to the data response
        res.send({
            status: 'success',
            message: 'User created successfully',
            data: Object.assign({ id }, value)
        })
    }
})

// establish http server connection
app.listen(PORT, () => { console.log(`App is running on port: ${PORT}`) });