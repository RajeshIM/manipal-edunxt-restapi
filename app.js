var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
  cors = require('cors'),
  i18n = require("i18n"),
	db = require('./models'),
	routes = require('./routes'),
	underscore = require('underscore'),
	app = express();

global._ = underscore;

// i18n config
i18n.configure({
  locales: ['en'],
  directory: __dirname + '/config/locales'
});

global.__ = i18n.__;

// Initialize i18n and set Locale
app.use(i18n.init);
app.use(cors());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

module.exports = app;
