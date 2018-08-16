const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  errorhandler = require('errorhandler');
const intializeDatabase = require("./mongoConnect/connection");
const routes = require("./mongoConnect/routes");
// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('dist'));// it will prefer the directory to serve the file

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(errorhandler());


// finally, let's start our server...

intializeDatabase().then(db => {
  // Initialize the application once database connections are ready.
  routes(app, db).listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
})

