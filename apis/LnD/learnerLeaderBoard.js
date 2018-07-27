var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerLeaderBoard = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		query = '';
	
   	query = `SELECT df.user_id, df.user_type, df.person_id, df.rollno AS learnerSerialNumber, 
	   	     		df.person_name AS learnerName, ROUND(AVG(df.points_earned)) AS pointsEarned, 
	   				ROUND(AVG(df.test_performance),2) AS testPerformance, 
	   				ROUND(AVG(df.exam_score),2) AS examScore, 
	   				ROUND(AVG(df.avg_test_performance),2) AS avgTestPerformance, 
	   				op.last_month_points_earned AS pointsEarnedSinceLastMonth 
	   				FROM muln_daily_lerner_organization_performance AS df
			LEFT JOIN (SELECT user_id, user_type, person_id, rollno, person_name, 
				   			   ROUND(AVG(points_earned)) AS last_month_points_earned 
						FROM muln_monthly_lerner_organization_performance 
	    				WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + `GROUP BY 1,2,3,4,5
			) AS op
			ON df.user_id=op.user_id AND 
   			   df.user_type=op.user_type AND 
   			   df.person_id=op.person_id 
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1,2,3,4,5`;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}