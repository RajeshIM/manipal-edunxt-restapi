var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils'),
	async = require('async');

exports.daywiseActiveUsers = function (req, res) {
	var date = utils.getDates(req, true),
		currentDay = date.currentDate,
		currentHour = date.currentHour,
		isCurrent = false,
		isHour = false,
		isDay = false,
		dayAttributes = [],
		hourAttributes = [],
		currentAttributes = [],
		where = {},
		dayQuery = {},
		hourQuery = {},
		currentQuery ={},
		aggFields = ['activeLearners:SUM', 'activeFacultiesAndAdmins:SUM', 'onlineDelivery:SUM', 'offlineDelivery:SUM'],
		aggData = apis.getAttributes(aggFields),
		graphData = [],
		responseData = {
			totalUsers: 0,
			currentActivity: 0,
		};

	if (date.days == 1) {
		isHour = true;
		hourAttributes = ['LnDUserId',['hour', 'date']];
		hourAttributes = _.union(hourAttributes, aggData);
		group = ['hour'];
		var hourOptions = {
			req: req,
			attributes: hourAttributes,
			//startDate: true,
			//endDate: true,
			group: group
		};
		hourQuery = apis.getQuery(hourOptions);
		// hourQuery.where.hour = hourQuery.where.date;
		// delete hourQuery.where.date;
	} else {
		isDay = true;
		dayAttributes = ['LnDUserId', ['day', 'date']];
		dayAttributes = _.union(dayAttributes, aggData);
		group = ['day'];
		var dayOptions = {
			req: req,
			attributes: dayAttributes,
			// startDate: true,
			// endDate: true,
			group: group
		};
		dayQuery = apis.getQuery(dayOptions);
		// dayQuery.where.day = dayQuery.where.date;
		// delete dayQuery.where.date;
	}

	if (date.current) {
		isCurrent = true;
		currentAttributes = ['LnDUserId'];
		currentAttributes = _.union(currentAttributes, aggData);
		group = ['LnDUserId'];
		var currentOptions = {
			req: req,
			attributes: currentAttributes,
			group: group
		};
		currentQuery = apis.getQuery(currentOptions);
	}

	async.parallel({
		daywiseActiveUsers: function (next) {
			if (isDay) {
				models.daywiseActiveUsers.findAll(dayQuery).then(function (data) {	
				    next(null, data);
				}).catch(function (err) {
				   next(err);
				});
			} else {
				next(null, []);
			}
		},
		hourwiseActiveUsers: function (next) {
			if (isHour) {
				models.hourwiseActiveUsers.findAll(hourQuery).then(function (data) {	
				    next(null, data);
				}).catch(function (err) {
				   next(err);
				});
			} else {
				next(null, []);
			}
		},
		currentActiveUsers: function (next) {
			if (isCurrent) {
				models.currentActiveUsers.findAll(currentQuery).then(function (data) {
					data = data ? data : {};
				    next(null, data);
				}).catch(function (err) {
				   next(err);
				});
			} else {
				next(null, {});
			}
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var daywiseActiveUsers = results.daywiseActiveUsers,
				hourwiseActiveUsers = results.hourwiseActiveUsers,
				currentActiveUsers = results.currentActiveUsers;
		    graphData = _.union(daywiseActiveUsers, hourwiseActiveUsers);
		    if (!_.isEmpty(currentActiveUsers)) {
		    	currentActiveUsers = currentActiveUsers[0].toJSON();
		    	currentActiveUsers.date = isDay ? currentDay : currentHour;
		    	graphData.push(currentActiveUsers);
		    }
		    responseData.totalUsers = 1500;
		    responseData.currentActivity = 200;
		    responseData.graphData = graphData;
		    response.sendSuccessResponse(res, responseData);
		}
	});
}