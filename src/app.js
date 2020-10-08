const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const connectToDatabase = require('./db/connect');

connectToDatabase();
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use('/api/v1', middlewares.rateLimiter, middlewares.speedLimiter, api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
