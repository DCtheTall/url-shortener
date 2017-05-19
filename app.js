if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(routes);

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

const port = normalizePort(process.env.PORT || 3001);
