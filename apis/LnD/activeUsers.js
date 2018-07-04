var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.activeUsers = function (req, res) {
	var date = utils.getDates(req),
		userId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		userType  =  req.headers['usertype'] ? req.headers['usertype'] : null,
		courseId =  req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		programId =  req.headers['programid'] ? parseInt(req.headers['programid']) : null,
		userIdFilter = '',
		courseIdFilter = '',
		userTypeFilter = '',
		programIdFilter = '',
		dateFilter = '',
		filters = '',
		responseData = {};

	if (userId) {
		userIdFilter = ` user_id = ${userId}`;
	}
	if (userType) {
		userTypeFilter = ` user_type = '${userType}'`;
	}
	if (courseId){
		courseIdFilter = ` course_id = ${courseId}`;
	}
	if (programId){
		programIdFilter = ` program_id = ${programId}`;
	}

	var activeUsersQuery = '',
		activeUsersSinceLastMonthQuery = '',
		enrolledUsersQuery = '',
		enrolledUsersSinceLastMonthQuery = '';

	if (date.currentStatus) {
		activeUsersQuery = `SELECT COUNT(distinct person_id) as activeUsers FROM muln_current_active_users`;
	}else {
		activeUsersQuery = `SELECT AVG(active_users_count) as activeUsers FROM muln_daily_active_users  where load_date between '${date.start}' and '${date.end}'`;
	}

	activeUsersSinceLastMonthQuery = `SELECT monthly_active_users_count AS activeUsersSinceLastMonth FROM muln_monthly_active_users 
										WHERE load_date=date_format(last_day(DATE_SUB(NOW(),INTERVAL 1 MONTH)), '%M-%Y')`;
	console.log(activeUsersSinceLastMonthQuery)
   filters = userId ? userIdFilter : '';
   filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
   filters = (filters.length > 0) ? (' AND ' + filters) : '';

   var enrolledUsersDate = date.currentStatus ? 'WHERE load_date=DATE(NOW()) ' : `WHERE load_date between '${date.start}' and '${date.end}' `; 
   if (courseId) {
   	enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_courses_wise_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   } else {
   	enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_all_courses_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   }
   
   if (courseId) {
   		enrolledUsersSinceLastMonthQuery = `SELECT monthly_enrolled_users_count as enrolledUsersSinceLastMonth FROM muln_courses_wise_monthly_enrolled_persons_count
										where load_date=date_format(last_day(DATE_SUB(NOW(),INTERVAL 1 MONTH)), '%M-%Y')` + filters;
   } else {
   		enrolledUsersSinceLastMonthQuery = `SELECT monthly_enrolled_users_count as enrolledUsersSinceLastMonth FROM muln_all_courses_monthly_enrolled_persons_count 
   		   								where load_date=date_format(last_day(DATE_SUB(NOW(),INTERVAL 1 MONTH)), '%M-%Y')` + filters;
   }
   
	async.parallel({
		activeUsers: function (next) {
			models.sequelize_test.query(activeUsersQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? data[0].activeUsers : 0;
				data = data ? data : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		activeUsersSinceLastMonth: function (next) {
			models.sequelize_test.query(activeUsersSinceLastMonthQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? data[0].activeUsersSinceLastMonth : 0;
				data = data ? data : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		enrolledUsers: function (next) {
			models.sequelize_test.query(enrolledUsersQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? data[0].enrolledUsers : 0;
				data = data ? data : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
			
		},
		enrolledUsersSinceLastMonth: function (next) {
			models.sequelize_test.query(enrolledUsersSinceLastMonthQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? data[0].enrolledUsersSinceLastMonth : 0;
				data = data ? data : 0;
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