var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.learnerEngagement = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		filters = apis.getFiltersForRawQuery(req, false),
		completedTrainingQuery = '',
		completedTrainingSinceLastMonthQuery = '',
		responseData = {};


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
			completedTrainingQuery = `select avg(completed) as completed from muln_all_courses_daily_learner_engagement where load_date between '${date.start}' and '${date.end}'`+filters;
		}
    }
   
    if (courseId) {
    	completedTrainingSinceLastMonthQuery = `SELECT monthly_completed as monthlyCompleted FROM muln_course_wise_monthly_learner_engagement
										where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
    }else {
    	completedTrainingSinceLastMonthQuery = `SELECT monthly_completed as monthlyCompleted FROM muln_all_courses_monthly_learner_engagement
										where load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')` + filters;
    }

     var enrolledUsersDate = date.currentStatus ? 'WHERE load_date=DATE(NOW()) ' : `WHERE load_date between '${date.start}' and '${date.end}' `; 
   	 if (courseId) {
   		enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_courses_wise_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   	 } else {
   		enrolledUsersQuery = `SELECT AVG(enrolled_users_count) as enrolledUsers FROM muln_all_courses_daily_enrolled_pesons_count `+ enrolledUsersDate + filters;
   	 }
    
	async.parallel({
		usersCompleted: function (next) {
			models[tenant].query(completedTrainingQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? Math.round( data[0].completed || 0) : 0;
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		},
		usersCompletedSinceLastMonth: function (next) {
			models[tenant].query(completedTrainingSinceLastMonthQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				data = data.length > 0 ? parseFloat(data[0].monthlyCompleted || 0) : 0;
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