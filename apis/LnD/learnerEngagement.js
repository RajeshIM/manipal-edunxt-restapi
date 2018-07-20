var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.learnerEngagement = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		courseId = req.query.courseId ? parseInt(req.query.courseId): null,
		date = utils.getDates(req),
		usersCompletedOptions = {
			req: req,
			startDate: true,
			endDate: true
		};

	if (date.currentStatus) delete usersCompletedOptions.startDate;

	var usersCompletedQuery = apis.getQuery(usersCompletedOptions),
		usersCompletedTable = courseId ? 'courseWiseLearnerEngagement': 'allCoursesLearnerEngagement',
		usersCompletedSinceLastMonthOptions = {
			req: req,
			lastMonth: true
		},
		usersCompletedSinceLastMonthQuery = apis.getQuery(usersCompletedSinceLastMonthOptions),
		usersCompletedSinceLastMonthTable = courseId ? 'courseWiseMonthlyLearnerEngagement': 'allCoursesMonthlyLearnerEngagement',
		enrolledUserOptions = {
			req: req,
			startDate: true,
			endDate: true
		},
		enrolledUsersQuery = apis.getQuery(enrolledUserOptions),
		enrolledUserTable = courseId ? 'courseWiseEnrolledPersons' : 'allCoursesEnrolledPersons';
		responseData = {};

	async.parallel({
		usersCompleted: function (next) {
			models[tenant+'_'+usersCompletedTable].aggregate('completed', 'avg', usersCompletedQuery).then(function (count) {
				count = count ? Math.round(count || 0) : 0;
			    next(null, count);
			}).catch(function (err) {
			    next(err);
			});
		},
		usersCompletedSinceLastMonth: function (next) {
			models[tenant+'_'+usersCompletedSinceLastMonthTable].findOne(usersCompletedSinceLastMonthQuery).then(function (data) {
				data = data? Math.round(data.monthlyCompleted || 0) : 0;
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
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var usersCompletedPrograms = results.usersCompleted,
				completedProgramsSinceLastMonth = results.usersCompletedSinceLastMonth,
				enrolledUsers = results.enrolledUsers;

			responseData.usersCompletedPrograms = usersCompletedPrograms;
			responseData.completedProgramsSinceLastMonth = completedProgramsSinceLastMonth;
			responseData.enrolledUsers = enrolledUsers;
		    response.sendSuccessResponse(res, responseData);
		}
	});

}