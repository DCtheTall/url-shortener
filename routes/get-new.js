const { MongoClient } = require('mongodb');
const { isWebUri } = require('valid-url');
const Promise = require('bluebird');

const mongoclient = new MongoClient();

function getNew(req, res) {
  const { url } = req.params;

  if (!isWebUri(url)) {
    res.json({ error: 'The provided URL is not valid.' });
    return;
  }

  Promise.promisify(mongoclient.connect).call(mongoclient, process.env.MONGO_URI)
    .then((db) => new Promise((resolve, reject) =>
      db.collection('urls').find({ originalUrl: url }).toArray((err, data) => {
        if (err) {
          db.close();
          reject(err);
        } else if (data.length) {
          const { originalUrl, shortcut } = data[0];
          const shortUrl = `${process.env.DOMAIN}/${shortcut}`;
          res.json({ originalUrl, shortUrl });
        } else {
          resolve(db);
        }
      })
    ))
    .then((db) => new Promise((resolve, reject) =>
      db.collection('urls').find().sort({ shortcut: -1 }).limit(1).toArray((err, data) => {
        if (err) {
          db.close();
          reject(err);
        } else {
          resolve([db, data]);
        }
      })
    ))
    .then(([db, data]) => new Promise((resolve, reject) => {
      const shortcut = data.length === 0 ? 0 : data[0].shortcut + 1;
      db.collection('urls').insertOne({ shortcut, originalUrl: url }, (err, result) => {
        if (err) {
          db.close();
          reject(err);
        } else {
          resolve([db, shortcut]);
        }
      });
    }))
    .then(([db, shortcut]) => {
      const shortUrl = `${process.env.DOMAIN}/${shortcut}`;
      res.json({ originalUrl: url, shortUrl });
      db.close();
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
}

module.exports = getNew;
