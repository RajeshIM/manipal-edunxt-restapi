var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.feedback = function (req, res) {
	var date = utils.getDates(req),
		userId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		userType  =  req.headers['usertype'] ? req.headers['usertype'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
		userIdFilter = '',
		monthlyUserIdFilter = '',
		courseIdFilter = '',
		monthlyCourseIdFilter = '',
		userTypeFilter = '',
		monthlyUserTypeFilter = '',
		programIdFilter = '',
		monthlyProgramIdFilter = '',
		dateFilter = '',
		filters = '',
		monthlyFilters = '',
		responseData = {};

	if (userId) {
		userIdFilter = ` user_id = ${userId}`;
		monthlyUserIdFilter = ` df.user_id = ${userId}`;
	}
	if (userType) {
		userTypeFilter = ` user_type = '${userType}'`;
		monthlyUserTypeFilter = ` df.user_type = '${userType}'`;
	}
	if (courseId){
		courseIdFilter = ` course_id = ${courseId}`;
		monthlyCourseIdFilter = ` df.course_id = ${courseId}`;
	}
	if (programId){
		programIdFilter = ` program_id = ${programId}`;
		monthlyProgramIdFilter = ` df.program_id = ${programId}`;
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

   	monthlyFilters = userId ? monthlyUserIdFilter : '';
   	monthlyFilters = (monthlyFilters.length > 0 && courseId) ? (monthlyFilters + ' AND' + monthlyCourseIdFilter) : 
   				(courseId ? monthlyCourseIdFilter : monthlyFilters);
   	monthlyFilters = (monthlyFilters.length > 0 && programId) ? (monthlyFilters + ' AND' + monthlyProgramIdFilter): 
   	   		(programId ? monthlyProgramIdFilter : monthlyFilters);
   	monthlyFilters = (monthlyFilters.length > 0 && userType) ? (monthlyFilters + ' AND' + monthlyUserTypeFilter) : 
   	   		(userType ? userTypeFilter : monthlyFilters);
   	monthlyFilters = (monthlyFilters.length > 0) ? (' AND ' + monthlyFilters) : '';

   	if (date.currentStatus) {
   		if (courseId){
			ratingQuery = `select trainerrating, learnersatisfaction, contentrating from muln_course_wise_daily_feedback WHERE load_date=DATE(NOW()) `+ filters;
		}else {
			ratingQuery = `select trainerrating, learnersatisfaction, contentrating from muln_all_courses_daily_feedback WHERE load_date=DATE(NOW()) `+ filters;
		}
   	}else {
		if (courseId) {
			ratingQuery = `select avg(trainerrating) as trainerrating, avg(learnersatisfaction) as learnersatisfaction, avg(contentrating) as contentrating
					from muln_course_wise_daily_feedback where load_date between '${date.start}' and '${date.end}'`+filters;
		}else {
			ratingQuery = `select avg(trainerrating) as trainerrating, avg(learnersatisfaction) as learnersatisfaction, avg(contentrating) as contentrating 
						from muln_all_courses_daily_feedback where load_date between '${date.start}' and '${date.end}'`+filters;
		}
    }

    if (date.currentStatus) {
    	if (courseId) {
    		changeInRatingQuery = `SELECT (AVG(df.trainerrating)-lmf.lm_trainerrating) AS trainerratingby,
    							 (AVG(df.learnersatisfaction)-lmf.lm_learnersatisfaction) AS learnersatisfationby,
    							(AVG(df.contentrating)-lmf.lm_contentrating) AS contentratingby 
    							FROM muln_course_wise_daily_feedback  AS df
    							INNER JOIN ( SELECT  user_id, user_type, program_id, course_id, 
    							    monthly_trainerrating AS lm_trainerrating,
    								monthly_learnersatisfaction AS lm_learnersatisfaction, 
    								monthly_contentrating AS lm_contentrating 
    								FROM muln_course_wise_monthly_feedback 
    								WHERE load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')`+ filters +
    								`) AS lmf ON df.user_id=lmf.user_id AND df.user_type=lmf.user_type AND 
    							df.program_id=lmf.program_id AND df.course_id=lmf.course_id
    							WHERE df.load_date=DATE(NOW())` + monthlyFilters;
    	} else {
    		changeInRatingQuery = `SELECT (AVG(df.trainerrating)-lmf.lm_trainerrating) AS trainerratingby,
    							 (AVG(df.learnersatisfaction)-lmf.lm_learnersatisfaction) AS learnersatisfationby,
    							(AVG(df.contentrating)-lmf.lm_contentrating) AS contentratingby 
    							FROM muln_all_courses_daily_feedback AS df
    							INNER JOIN ( SELECT  user_id, user_type, monthly_trainerrating AS lm_trainerrating,
    								monthly_learnersatisfaction AS lm_learnersatisfaction, 
    								monthly_contentrating AS lm_contentrating 
    								FROM muln_all_courses_monthly_feedback 
    								WHERE load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')`+ filters +
    								`) AS lmf ON df.user_id=lmf.user_id AND df.user_type=lmf.user_type
    							WHERE df.load_date=DATE(NOW())` + monthlyFilters;
        }
    }else {
    	if (courseId) {
    		changeInRatingQuery = `SELECT (AVG(df.trainerrating)-lmf.lm_trainerrating) AS trainerratingby,
    							 (AVG(df.learnersatisfaction)-lmf.lm_learnersatisfaction) AS learnersatisfationby,
    							(AVG(df.contentrating)-lmf.lm_contentrating) AS contentratingby 
    							FROM muln_course_wise_daily_feedback  AS df
    							INNER JOIN ( SELECT  user_id, user_type, program_id, course_id,
    							    monthly_trainerrating AS lm_trainerrating,
    								monthly_learnersatisfaction AS lm_learnersatisfaction, 
    								monthly_contentrating AS lm_contentrating 
    								FROM muln_course_wise_monthly_feedback 
    								WHERE load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')`+ filters +
    								`) AS lmf ON df.user_id=lmf.user_id AND df.user_type=lmf.user_type AND 
    							df.program_id=lmf.program_id AND df.course_id=lmf.course_id
    							WHERE df.load_date between '${date.start}' and '${date.end}'` + monthlyFilters;
    	} else {
    		changeInRatingQuery = `SELECT (AVG(df.trainerrating)-lmf.lm_trainerrating) AS trainerratingby,
    							 (AVG(df.learnersatisfaction)-lmf.lm_learnersatisfaction) AS learnersatisfationby,
    							(AVG(df.contentrating)-lmf.lm_contentrating) AS contentratingby 
    							FROM muln_all_courses_daily_feedback  AS df
    							INNER JOIN ( SELECT  user_id, user_type, monthly_trainerrating AS lm_trainerrating,
    								monthly_learnersatisfaction AS lm_learnersatisfaction, 
    								monthly_contentrating AS lm_contentrating 
    								FROM muln_all_courses_monthly_feedback 
    								WHERE load_date= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y')`+ filters +
    								`) AS lmf ON df.user_id=lmf.user_id AND df.user_type=lmf.user_type
    							WHERE df.load_date between '${date.start}' and '${date.end}'` + monthlyFilters;
    	}
    }

	async.parallel({
		rating: function (next) {
			models.sequelize_test.query(ratingQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				var trainerRating = data.length > 0 ? parseFloat(data[0].trainerrating || 0): 0,
					learnerSatisfaction = data.length>0 ? parseFloat(data[0].learnersatisfaction || 0): 0,
					contentRating = data.length>0 ? parseFloat(data[0].contentrating || 0): 0;
			    next(null, {
			    	trainerRating: trainerRating,
			    	learnerSatisfaction: learnerSatisfaction,
			    	contentRating: contentRating
			    });
			}).catch(function (err) {
			    next(err);
			});
		},
		changeInRating: function (next) {
			models.sequelize_test.query(changeInRatingQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
				var trainerRatingBy = data.length > 0 ? parseFloat(data[0].trainerratingby || 0): 0,
					learnerSatisfationBy = data.length>0 ? parseFloat(data[0].learnersatisfationby || 0): 0,
					contentRatingBy = data.length>0 ? parseFloat(data[0].contentratingby || 0): 0;
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
			responseData.learnerSatisfaction = rating.learnerSatisfaction;
			responseData.trainerRatingBy = changeInRating.trainerRatingBy;
			responseData.contentRatingBy = changeInRating.contentRatingBy;
			responseData.learnerSatisfationBy = changeInRating.learnerSatisfationBy;
		    response.sendSuccessResponse(res, responseData);
		}
	});

}