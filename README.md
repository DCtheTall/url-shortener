# URL Shortener
A project for Free Code Camp by Dylan Cutler

Run `npm install` to get dependencies.

To start the app on port 3001, run `npm start`

### Example shortcut creation:
Making a GET request to:

`https://dcthetall-url-shortener.herokuapp.com/new/https://github.com/DCtheTall`

will get a response like the following:

`{ "originalUrl":"https://github.com/DCtheTall", "shortenedUrl":"https://dcthetall-url-shortener.herokuapp.com/12" }`

### Example usage:
After creating a shortcut, requesting

`https://dcthetall-url-shortnener.herokuapp.com/12`

will redirect you to

`https://github.com/DCtheTall`

## Environmental variables:
- `NODE_ENV` development or production environment
- `MONGO_URI` to connect to MongoDB
- `DOMAIN` where the app is hosted 
