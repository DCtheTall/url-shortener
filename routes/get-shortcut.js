const { MongoClient } = require('mongodb');
const Promise = require('bluebird');

const mongoclient = new MongoClient();

function getShortcut(req, res) {
  const { shortcut } = req.params;
  Promise.promisify(mongoclient.connect).call(mongoclient, process.env.MONGO_URI)
    .then((db) => new Promise((resolve, reject) =>
      db.collection('urls').find({ shortcut: +shortcut }).toArray((err, data) => {
        if (err) {
          db.close();
          reject(err);
        } else if (data.length === 0) {
          res.json({ error: 'This shortcut does not redirect to any URL.' });
        } else {
          res.redirect(data[0].originalUrl);
        }
      })
    ))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

module.exports = getShortcut;
