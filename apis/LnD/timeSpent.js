var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.timeSpent = function (req, res) {
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
		table = courseId ? 'muln_course_wise_timespent': 'muln_all_courses_timespent',
		query = '',
		responseData = {
			timeSpent: 0,
			expectedTimeSpent: 0,
			durationSpent: 0,
			courseDuration: 0
		};

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


   	filters = userId ? userIdFilter : '';
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
   	filters = (filters.length > 0) ? (' AND ' + filters) : '';

 	query = 'select time_spent_percentage, expected_time_spent_percentage, duration_spent, course_duration from '+ table + ` where load_date=date(now())`+ filters;
    
    models.sequelize_test.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
    	if (data.length > 0) {
    		responseData.timeSpent = data[0].time_spent_percentage ? parseFloat(data[0].time_spent_percentage) : 0;
    		responseData.expectedTimeSpent = data[0].expected_time_spent_percentage ? parseFloat(data[0].expected_time_spent_percentage) : 0;
    		responseData.durationSpent = data[0].duration_spent ? parseInt(parseInt(data[0].duration_spent)/60) : 0;
    		responseData.courseDuration = data[0].course_duration ? parseInt(parseInt(data[0].course_duration)/60) : 0;
    	}
		response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});

}