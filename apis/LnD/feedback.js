var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.feedback = function (req, res) {
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

	var ratingQuery = '',
		changeInRatingQuery = '';


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
			ratingQuery = `select trainerrating, learnersatisfation, contentrating from muln_course_wise_daily_feedback WHERE load_date=DATE(NOW()) `+ filters;
		}else {
			ratingQuery = `select trainerrating, learnersatisfation, contentrating from muln_all_courses_daily_feedback WHERE load_date=DATE(NOW()) `+ filters;
		}
   	}else {
		if (courseId) {
			ratingQuery = `select avg(trainerrating) as trainerrating, avg(learnersatisfation) as learnersatisfation, avg(contentrating) as contentrating
					from muln_course_wise_daily_feedback where load_date between '${date.start}' and '${date.end}'`;
		}else {
			ratingQuery = `select avg(trainerrating) as trainerrating, avg(learnersatisfation) as learnersatisfation, avg(contentrating) as contentrating 
						from muln_all_courses_daily_feedback where load_date between '${date.start}' and '${date.end}'`+filters;
		}
    }
   
    if (courseId) {
    	changeInRatingQuery = `select monthly_trainerrating, monthly_learnersatisfation, monthly_contentrating from muln_couse_wise_monthly_feedback  
								where load_date=date_format(last_day(DATE_SUB(NOW(),INTERVAL 1 MONTH)), '%M-%Y')` + filters;
    }else {
    	changeInRatingQuery = `select monthly_trainerrating, monthly_learnersatisfation, monthly_contentrating from muln_couse_wise_monthly_feedback
										where load_date=date_format(last_day(DATE_SUB(NOW(),INTERVAL 1 MONTH)), '%M-%Y')` + filters;
    }

	async.parallel({
		rating: function (next) {
			models.sequelize_test.query(ratingQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				var trainerRating = data.length > 0 ? (data[0].trainerrating || 0): 0,
					learnerSatisfation = data.length>0 ? (data[0].learnersatisfation || 0): 0,
					contentRating = data.length>0 ? (data[0].contentrating || 0): 0;
			    next(null, {
			    	trainerRating: trainerRating,
			    	learnerSatisfation: learnerSatisfation,
			    	contentRating: contentRating
			    });
			}).catch(function (err) {
			    next(err);
			});
		},
		changeInRating: function (next) {
			models.sequelize_test.query(changeInRatingQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				var trainerRatingBy = data.length > 0 ? (data[0].monthly_trainerrating || 0): 0,
					learnerSatisfationBy = data.length>0 ? (data[0].monthly_learnersatisfation || 0): 0,
					contentRatingBy = data.length>0 ? (data[0].monthly_contentrating || 0): 0;
			    next(null, {
			    	trainerRatingBy: trainerRatingBy,
			    	learnerSatisfationBy: learnerSatisfationBy,
			    	contentRatingBy: contentRatingBy
			    });
			}).catch(function (err) {
			    next(err);
			});
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var rating = results.rating,
				changeInRating = results.changeInRating;

			responseData.trainerRating = rating.trainerRating;
			responseData.contentRating = rating.contentRating;
			responseData.learnerSatisfation = rating.learnerSatisfation;
			responseData.trainerRatingBy = changeInRating.trainerRatingBy;
			responseData.contentRatingBy = changeInRating.contentRatingBy;
			responseData.learnerSatisfationBy = changeInRating.learnerSatisfationBy;
		    response.sendSuccessResponse(res, responseData);
		}
	});

}