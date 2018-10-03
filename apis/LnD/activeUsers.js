var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.activeUsers = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		courseId = req.query.courseId ? parseInt(req.query.courseId) : null,
		date = utils.getDates(req),
		activeUserTable = 'activeUsersCount',
		activeUsersQuery = {
			attribute: ['activeUsers']
		},
		activeUsersSinceLastMonthQuery = {
			attribute: ['montlyActiveUsers'],
			where: {
				date: date.lastMonth
			}
		},
		enrolledUserOptions = {
			req: req,
			startDate: true,
			endDate: true
		},
		enrolledUsersQuery = apis.getQuery(enrolledUserOptions),
		enrolledUserTable = courseId ? 'courseWiseEnrolledPersons' : 'allCoursesEnrolledPersons',
		enrolledUserSinceLastMonthOptions = {
			req: req,
			lastMonth: true
		},
		enrolledUserSinceLastMonthQuery = apis.getQuery(enrolledUserSinceLastMonthOptions),
		enrolledUserSinceLastMonthTable = courseId ? 'courseWiseMonthlyEnrolledPersons' : 'allCoursesMonthlyEnrolledPersons',
		responseData = {};

	async.parallel({
		activeUsers: function (next) {
			models[tenant + '_' + 'activeUsersCount'].findOne(activeUsersQuery).then(function (data) {
				data = data ? Math.round(data.activeUsers || 0) : 0;
				next(null, data);
			}).catch(function (err) {
				next(err);
			});
		},
		activeUsersSinceLastMonth: function (next) {
			models[tenant + '_' + 'monthlyActiveUsers'].findOne(activeUsersSinceLastMonthQuery).then(function (data) {
				data = data ? Math.round(data.montlyActiveUsers || 0) : 0;
				next(null, data);
			}).catch(function (err) {
				next(err);
			});
		},
		enrolledUsers: function (next) {
			models[tenant + '_' + enrolledUserTable].aggregate('enrolledUsers', 'avg', enrolledUsersQuery).then(function (count) {
				count = count ? Math.round(count || 0) : 0;
				next(null, count);
			}).catch(function (err) {
				next(err);
			});
		},
		enrolledUsersSinceLastMonth: function (next) {
			models[tenant + '_' + enrolledUserSinceLastMonthTable].findOne(enrolledUserSinceLastMonthQuery).then(function (data) {
				data = data ? Math.round(data.monthlyEnrolledUsers || 0) : 0;
				next(null, data);
			}).catch(function (err) {
				next(err);
			});
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var activeUsers = results.activeUsers,
				activeUsersSinceLastMonth = results.activeUsersSinceLastMonth,
				enrolledUsers = results.enrolledUsers,
				enrolledUsersSinceLastMonth = results.enrolledUsersSinceLastMonth;

			responseData.activeUsers = activeUsers;
			responseData.activeUsersSinceLastMonth = activeUsersSinceLastMonth;
			responseData.enrolledUsers = enrolledUsers;
			responseData.enrolledUsersSinceLastMonth = enrolledUsersSinceLastMonth;
			response.sendSuccessResponse(res, responseData);
		}
	});

}