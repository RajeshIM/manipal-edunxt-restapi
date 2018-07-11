var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.learnerPace = function (req, res) {
	var date = utils.getDates(req),
		userId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		userType  =  req.headers['usertype'] ? req.headers['usertype'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
		userIdFilter = '',
		courseIdFilter = '',
		userTypeFilter = '',
		programIdFilter = '',
		table = courseId ? 'muln_course_wise_daily_learner_pace ': 'muln_all_courses_daily_learner_pace ',
		dateFilter = date.currentStatus ? 'where load_date=DATE(now())' : `where load_date=DATE('${date.end}')`,
		filters = '',
		learnerPaceQuery = '',
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


	filters = dateFilter;
   	filters = (filters.length > 0 && userId) ? (filters + ' AND' + userIdFilter) : 
   				(userId ? userIdFilter : filters);
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);

   	learnerPaceQuery = `select aheadschedule, ontrack, behindschedule,have_not_started as havenotstarted  
						from `+ table + filters;
	
	models.sequelize_test.query(learnerPaceQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
			responseData.aheadSchedule = data.length>0 ? parseFloat(data[0].aheadschedule || 0) : 0;
			responseData.onTrack = data.length>0 ? parseFloat(data[0].ontrack || 0) : 0;
			responseData.behindSchedule = data.length>0 ? parseFloat(data[0].behindschedule || 0) : 0;
			responseData.haveNotStarted = data.length>0 ? parseFloat(data[0].havenotstarted || 0) : 0;
			response.sendSuccessResponse(res, responseData);	
	}).catch(function (err) {
			response.customErrorMessage(res, err.message);
	});
	

}