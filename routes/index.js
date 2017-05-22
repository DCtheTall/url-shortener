const express = require('express');
const getNew = require('./get-new');
const getShortcut = require('./get-shortcut');

const router = express.Router();

router.get('/new/:url(*)', getNew);
router.get('/:shortcut', getShortcut);

module.exports = router;
