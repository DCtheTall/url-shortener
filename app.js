if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(routes);

module.exports = app;
