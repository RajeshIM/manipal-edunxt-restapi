var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.learnerEngagement = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		userId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		userType  =  req.headers['usertype'] ? req.headers['usertype'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
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

	var completedTrainingQuery = '',
		completedTrainingSinceLastMonthQuery = '';


   	filters = userId ? userIdFilter : '';
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
   	filters = (filters.length > 0) ? (' AND ' + filters) : '';

   	if (date.currentStatus) {
   		if (courseId){
			completedTrainingQuery = `select completed from muln_course_wise_daily_learner_engagement WHERE load_date=DATE(NOW()) `+ filters;
		}else {
			completedTrainingQuery = `select completed from muln_all_courses_daily_learner_engagement WHERE load_date=DATE(NOW()) `+ filters;
		}
   	}else {
		if (courseId) {
			completedTrainingQuery = `select avg(completed) as completed from muln_course_wise_daily_learner_engagement where load_date between '${date.start}' and '${date.end}'`+filters;
		}else {
			completedTrainingQuery = `select avg(completed)as completed from muln_all_courses_daily_learner_engagement where load_date between '${date.start}' and '${date.end}'`+filters;
		}
    }
   
    if (courseId) {
    	completedTrainingSinceLastMonthQuery = `SELECT monthly_completed as monthlyCompleted FROM muln_course_wise_monthly_learner_engagement
										where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
    }else {
    	completedTrainingSinceLastMonthQuery = `SELECT monthly_completed as monthlyCompleted FROM muln_all_courses_monthly_learner_engagement
										where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
    }
    
	async.parallel({
		usersCompleted: function (next) {
			models[tenant].query(completedTrainingQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? parseFloat( data[0].completed || 0) : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		usersCompletedSinceLastMonth: function (next) {
			models[tenant].query(completedTrainingSinceLastMonthQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? parseFloat(data[0].monthlyCompleted || 0) : 0;
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
			var usersCompletedPrograms = results.usersCompleted,
				completedProgramsSinceLastMonth = results.usersCompletedSinceLastMonth;

			responseData.usersCompletedPrograms = usersCompletedPrograms;
			responseData.completedProgramsSinceLastMonth = completedProgramsSinceLastMonth;
		    response.sendSuccessResponse(res, responseData);
		}
	});

}