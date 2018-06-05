var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils'),
	async = require('async');

exports.userActivityByLocation = function (req, res) {
	var date = utils.getDates(req),
		fields = ['locationName'],
	    aggFields = ['totalActiveUsers:SUM', 'activeUsersSinceLastMonth:SUM'],
	    group = fields,
	    aggData = apis.getAttributes(aggFields),
	    attributes = _.union(fields, aggData),
	    dayQuery = apis.getQuery(req, attributes, true, group),
		currentQuery = {},
		isCurrent = false,
		isDay = true,
		responseData = [];


	if (date.current) {
		isCurrent = true;
		currentQuery = apis.getQuery(req, attributes, false, group)
	}
	if (date.current && date.days == 0) isDay = false;
	
	async.parallel({
		daywiseActivity: function (next) {
			if (isDay) {
				models.daywiseUserActivityByLocation.findAll(dayQuery).then(function (data) {	
				    next(null, data);
				}).catch(function (err) {
				   next(err);
				});
			} else {
				next(null, []);
			}
		},
		currentActivity: function (next) {
			if (isCurrent) {
				models.userActivityByLocation.findAll(currentQuery).then(function (data) {
				    next(null, data);
				}).catch(function (err) {
				   next(err);
				});
			} else {
				next(null, []);
			}
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var daywiseActivity = results.daywiseActivity,
				currentActivity = results.currentActivity;

		    responseData = _.union(daywiseActivity, currentActivity);

		    response.sendSuccessResponse(res, responseData);
		}
	});

}