var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.organizationPopularTopics = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		responseData=[],
		query = '';

   	query = `SELECT user_id, user_type, course_id as courseId, program_id AS programId, 
   					entity_id as entityId,df.entity_name AS courseName,
	   	     	ROUND(avg(followers)) as noOfFollowers
				FROM muln_organization_interests 
			WHERE  load_date BETWEEN '${date.start}' AND '${date.end}' `+ filters + 
			` GROUP BY 1,2,3,4,5 ORDER BY noOfFollowers DESC LIMIT 10`;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		for(var i= 0; i< data.length;i++){
			data[i].rank = i+1;
			responseData.push(data[i]);
		}
	    response.sendSuccessResponse(res, responseData);			
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});
}