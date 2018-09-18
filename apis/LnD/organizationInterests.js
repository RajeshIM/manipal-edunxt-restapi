var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.organizationInterests = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		query = '',
		topInterestsData = [],
		popularTopicsData = [],
		responseData = {};
	
	if(searchBy && searchTerm){
		monthlyFilters = monthlyFilters + ` AND df.entity_name like '%${searchTerm}%'`;
	}
   	query = `SELECT dc.user_id, dc.user_type, dc.courseId, 
				dc.programId,dc.entityId, dc.entity_type,dc.courseName as interest,
				ROUND(AVG(dc.hits)) AS totalHits,
				mc.monthly_hits AS hitsSinceLastMonth,
				ROUND(avg(dc.followers),0) as noOfFollowers,
	   	     	mc.monthly_followers as followersSinceLastMonth 
	   	     	FROM
				(SELECT df.user_id, df.user_type, df.course_id AS courseId, df.program_id AS programId, df.entity_id AS entityId,
				entity_name AS courseName,entity_type,
				ROUND(AVG(df.viewcount)) AS hits,
				ROUND(avg(df.followers),0) as followers
				FROM muln_organization_interests AS df
				WHERE df.load_date BETWEEN '${date.start}' AND '${date.end}' ` + 
				monthlyFilters + `GROUP BY 1,2,3,4,5 ORDER BY df.viewcount DESC LIMIT 3) dc
				LEFT JOIN 
				(
				SELECT user_id, user_type, course_id, program_id, entity_id,
				ROUND(AVG(monthly_hits)) AS monthly_hits,
				ROUND(AVG(monthly_followers),0) as monthly_followers 
				FROM muln_monthly_organization_interests 
				WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') ` + 
				filters + `GROUP BY 1,2,3,4,5
				) mc
				ON dc.user_id=mc.user_id
				AND dc.user_type=mc.user_type
				AND dc.programId=mc.program_id
				AND dc.courseId=mc.course_id
				AND dc.entityId=mc.entity_id
				GROUP BY 1,2,3,4,5`;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}