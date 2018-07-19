var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.activeUsers = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		filters = apis.getFiltersForRawQuery(req, false),
		responseData = {};


	var activeUsersQuery = '',
		activeUsersSinceLastMonthQuery = '',
		enrolledUsersQuery = '',
		enrolledUsersSinceLastMonthQuery = '';

	if (date.currentStatus) {
		activeUsersQuery = `SELECT COUNT(distinct person_id) as activeUsers FROM muln_current_active_users WHERE (login_time >= DATE_SUB(NOW(), INTERVAL 30 MINUTE))`;
	}else {
		activeUsersQuery = `SELECT AVG(active_users_count) as activeUsers FROM muln_daily_active_users  where load_date between '${date.start}' and '${date.end}'`;
	}

	activeUsersSinceLastMonthQuery = `SELECT monthly_active_users_count AS activeUsersSinceLastMonth FROM muln_monthly_active_users 
										WHERE load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')`;

   var enrolledUsersDate = date.currentStatus ? 'WHERE load_date=DATE(NOW()) ' : `WHERE load_date between '${date.start}' and '${date.end}' `; 
   if (courseId) {
   	enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_courses_wise_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   } else {
   	enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_all_courses_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   }
   
   if (courseId) {
   		enrolledUsersSinceLastMonthQuery = `SELECT monthly_enrolled_users_count as enrolledUsersSinceLastMonth FROM muln_courses_wise_monthly_enrolled_persons_count
										where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
   } else {
   		enrolledUsersSinceLastMonthQuery = `SELECT monthly_enrolled_users_count as enrolledUsersSinceLastMonth FROM muln_all_courses_monthly_enrolled_persons_count 
   		   								where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
   }
   
	async.parallel({
		activeUsers: function (next) {
			models[tenant].query(activeUsersQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? Math.round(data[0].activeUsers || 0) : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		activeUsersSinceLastMonth: function (next) {
			models[tenant].query(activeUsersSinceLastMonthQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? Math.round(data[0].activeUsersSinceLastMonth || 0) : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		enrolledUsers: function (next) {
			models[tenant].query(enrolledUsersQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? Math.round(data[0].enrolledUsers || 0) : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});	
		},
		enrolledUsersSinceLastMonth: function (next) {
			models[tenant].query(enrolledUsersSinceLastMonthQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? Math.round(data[0].enrolledUsersSinceLastMonth) : 0;
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