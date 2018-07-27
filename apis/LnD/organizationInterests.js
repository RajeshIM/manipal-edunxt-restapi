var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.organizationInterests = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		query = '',
		topInterestsData = [],
		popularTopicsData = [],
		responseData = {};
	
   	query = `SELECT df.user_id, df.user_type, df.course_id as courseId, df.program_id AS programId, 
	   	     	CONCAT(df.program_short_name,'-',df.course_name) AS courseName,
	   	     	ROUND(AVG(df.hits)) as hits,
	   	     	mo.monthly_hits as hitsSinceLastMonth
				FROM muln_organization_interests AS df
			LEFT JOIN (SELECT user_id, user_type, course_id, program_id, 
							  ROUND(AVG(monthly_hits)) as monthly_hits
				 	  FROM muln_monthly_organization_interests 
	    			  WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + ` GROUP BY 1,2,3,4
			) AS mo
			ON df.user_id=mo.user_id AND 
   			   df.user_type=mo.user_type AND 
   			   df.course_id=mo.course_id AND
   			   df.program_id=mo.program_id 
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			` GROUP BY 1,2,3,4 ORDER BY df.hits DESC LIMIT 10`;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		for(var i = 0; i < data.length; i++){
			var obj = data[i];
			obj.rank = i+1;
			if(i < 3) topInterestsData.push(obj);
			popularTopicsData.push(obj);
		}
		responseData.topInterestsData = topInterestsData;
		responseData.popularTopicsData = popularTopicsData;
	    response.sendSuccessResponse(res, responseData);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}