var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
  cors = require('cors'),
  i18n = require("i18n"),
	db = require('./models'),
	routes = require('./routes'),
	underscore = require('underscore'),
  path = require('path'),
  fs = require('fs'),
  dotenv = require('dotenv'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  saml = require('passport-saml'),
  logout = require('express-passport-logout'),
	app = express();

global._ = underscore;
global.models = db;

// i18n config
i18n.configure({
  locales: ['en'],
  directory: __dirname + '/config/locales'
});

global.__ = i18n.__;

dotenv.load();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var samlStrategy = new saml.Strategy({
  // URL that goes from the Identity Provider -> Service Provider
  callbackUrl: process.env.CALLBACK_URL,
  logoutUrl: process.env.LOGOUT_URL,
  logoutCallback: process.env.LOGOUTCALLBACK_URL,
  // URL that goes from the Service Provider -> Identity Provider
  entryPoint: process.env.ENTRY_POINT,
  // Usually specified as `/shibboleth` from site root
  issuer: process.env.ISSUER,
  identifierFormat: null,
  // Service Provider private key
  decryptionPvk: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  // Service Provider Certificate
  privateCert: fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  // Identity Provider's public key
  cert: fs.readFileSync(__dirname + '/cert/idp_cert.pem', 'utf8'),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true
}, function(profile, done) {
  return done(null, profile); 
});
// Initialize i18n and set Locale
app.use(i18n.init);
app.use(cors());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passport.use(samlStrategy);
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.redirect('/login');
}

// app.get('/',
//   ensureAuthenticated, 
//   function(req, res) {
//     res.redirect('/dashboard')
//   }
// );

app.get('/logout', function(req, res) {
  if (!req.user) res.redirect('/');
  return passport._strategy('saml').logout(req, function(err, uri) {
      req.logout();
      return res.redirect(uri);
  });
});


app.post('/logout/callback', function(req, res) {
    req.logout();
   res.redirect('/login');
});


app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.post('/login/callback',
   passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function(req, res) {
    res.cookie('user_id', req.user.uid);
    res.cookie('user_name', req.user.name);
    res.redirect('/');
  }
);

app.get('/login/fail', 
  function(req, res) {
    res.status(401).send('Login failed');
  }
);

app.get('/EduNxt.sso/Metadata', 
  function(req, res) {
    res.type('application/xml');
    res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8')));
  }
);

//app.use('/', ensureAuthenticated);

//Point static path to dist
//app.use('/', express.static(path.join(__dirname, '/dist/EduNxt-MaGE')));

app.use(routes);

// catch 404 and forward to error handler
app.use('/api/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    var response = require('./helpers/response');
    response.customErrorMessage(res, err.message, err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  var response = require('./helpers/response');
  response.customErrorMessage(res, err.message, err.status || 500);
});

 var server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});
