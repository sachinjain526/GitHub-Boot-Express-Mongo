const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  passport = require('passport'),
  session = require('express-session');
const intializeDatabase = require("./mongoConnect/connection");
const routes = require("./mongoConnect/routes");
// Create global app object
const app = express();
const router = express.Router();

// middle ware start 

app.use('/api', router);
app.use('/auth', router);
// for cors
app.use(cors());

// for body parser
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

// for sesion
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// finally, let's start our server...

intializeDatabase().then(db => {
  // Initialize the application once database connections are ready.
  routes(app, router, db).listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
});
