const express = require('express');
const getNew = require('get-new');

const router = express.Router();

router.get('/new/:url', getNew);

module.exports = router;
