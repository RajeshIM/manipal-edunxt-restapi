var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.activeUsersByLocation = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		query = '';
	
   	query = `SELECT df.location,ROUND(AVG(df.faculty_count), 0) AS facultyCount, 
	   				ROUND(AVG(df.learner_count), 0) AS learnerCount, 
	   				op.monthly_faculty_count AS monthlyFacultyCount, 
	   				op.monthly_learner_count AS monthlyLearnerCount
	   				FROM muln_location_wise_daily_active_learners_faculties AS df
			LEFT JOIN (SELECT  location,ROUND(AVG(faculty_count), 0) AS monthly_faculty_count,
							   ROUND(AVG(learner_count), 0) AS monthly_learner_count 
							   FROM muln_location_wise_monthly_active_learners_faculties 
	    				WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + `GROUP BY 1
			) AS op
			ON df.location=op.location
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1`;
			
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		response.sendSuccessResponse(res, data);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}