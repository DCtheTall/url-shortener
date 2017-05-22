const { MongoClient } = require('mongodb');
const Promise = require('bluebird');

const mongoclient = new MongoClient();

function getShortcut(req, res) {
  // const { shortcut } = req.params;
  // Promise.promisify(mongoclient.connect).call(mongoclient, process.env.MONGO_URI)
  //   .then((db) => new Promise((resolve, reject) =>
  //     db.collection('urls').find({ shortcut }).toArray()
  //   ))
}

module.exports = getShortcut;
