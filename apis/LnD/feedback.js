var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.feedback = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		responseData = {};
	
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
			models[tenant].query(ratingQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				var trainerRating = data.length > 0 ? parseFloat(data[0].trainerrating || 0).toFixed(2): 0,
					learnerSatisfaction = data.length>0 ? parseFloat(data[0].learnersatisfaction || 0).toFixed(2): 0,
					contentRating = data.length>0 ? parseFloat(data[0].contentrating || 0).toFixed(2): 0;
			    next(null, {
			    	trainerRating: parseFloat(trainerRating),
			    	learnerSatisfaction: parseFloat(learnerSatisfaction),
			    	contentRating: parseFloat(contentRating)
			    });
			}).catch(function (err) {
			    next(err);
			});
		},
		changeInRating: function (next) {
			models[tenant].query(changeInRatingQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				var trainerRatingBy = data.length > 0 ? parseFloat(data[0].trainerratingby || 0).toFixed(2): 0,
					learnerSatisfationBy = data.length>0 ? parseFloat(data[0].learnersatisfationby || 0).toFixed(2): 0,
					contentRatingBy = data.length>0 ? parseFloat(data[0].contentratingby || 0).toFixed(2): 0;
			    next(null, {
			    	trainerRatingBy: parseFloat(trainerRatingBy),
			    	learnerSatisfationBy: parseFloat(learnerSatisfationBy),
			    	contentRatingBy: parseFloat(contentRatingBy)
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