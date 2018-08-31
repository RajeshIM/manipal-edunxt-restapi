var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.modeOfDelivery = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		query = '';
	
   	query = `SELECT df.load_date as date,AVG(df.learner_count) AS onlineCount, 
	   				op.offline_learners_count AS offlineCount 
	   				FROM muln_location_wise_daily_active_learners_faculties AS df
			LEFT JOIN (SELECT  load_date,AVG(offline_learners_count) AS offline_learners_count
							   FROM muln_location_wise_daily_offline_learners_count 
	    				WHERE load_date BETWEEN '${date.start}' AND '${date.end}' `
	    				+ filters + `GROUP BY 1
			) AS op
			ON df.load_date = op.load_date
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1`;
			
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		response.sendSuccessResponse(res, data);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}