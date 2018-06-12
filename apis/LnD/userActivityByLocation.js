var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async');

exports.userActivityByLocation = function (req, res) {
	var date = utils.getDates(req),
		fields = ['locationName'],
	    aggFields = ['totalActiveUsers:SUM', 'activeUsersSinceLastMonth:SUM'],
	    group = fields,
	    aggData = apis.getAttributes(aggFields),
	    attributes = _.union(fields, aggData),
	    options = {
	    	req: req,
	    	attributes: attributes,
	    	group: group
	    },
	    query = apis.getQuery(options),
		isCurrent = false,
		isDay = false,
		responseData = [];


	if (date.current) {
		isCurrent = true;
	} else {
		isDay = true;
		//query.date = date.end;
	}
	
	async.parallel({
		daywiseActivity: function (next) {
			if (isDay) {
				models.daywiseUserActivityByLocation.findAll(query).then(function (data) {	
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
				models.userActivityByLocation.findAll(query).then(function (data) {
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