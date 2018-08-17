const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  passport = require('passport');
cookieSession = require('cookie-session'); // to manage cookie and session for express server
const intializeDatabase = require("./mongoConnect/connection");
const mongoRoutes = require("./mongoConnect/mongoRoutes");
const authRoutes = require('./auth/authRouters');
const jwtMiddleWare = require('./middlewares/jwtMiddleware');
// Create global app object
const app = express();
const router = express.Router();

// middle ware start 
app.use(cookieSession({
  name: 'session',
  keys: ['asdfghjkl'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(cors());

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
app.use(passport.initialize());
app.use(passport.session());
// finally, let's start our server...
app.set('jwtSecret', 'ashkdbahbhabcjhbahbcjhabsuhqaedgqwdvuqbc');

app.use(jwtMiddleWare());

intializeDatabase().then(db => {
  // Initialize the application once database connections are ready.
  app.listen(process.env.PORT || 3000, function () {
    mongoRoutes(app, db);
    authRoutes(app, db);
    console.log("server is running on port 3000");
  })
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
});
