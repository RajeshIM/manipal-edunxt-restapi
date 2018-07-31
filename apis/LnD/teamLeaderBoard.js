var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.teamLeaderBoard = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
	    fields = ['teamName'],
		aggFields = ['completion:completion_percentage:AVG', 'completedProgram:completed_program:SUM', 'teamSize:team_size:SUM'],
		aggData = apis.getAttributes(tenant, aggFields),
		attributes = _.union(fields, aggData),
		group = fields,
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true,
			group: group
		},
		query = apis.getQuery(options),
		table = 'teamWiseOrganizationPerformance';
	
	models[tenant+'_'+table].findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
