var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.teamLeaderBoard = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['teamId','teamName','actionMessage'],
		aggFields = ['completion:AVG', 'completedPrograms:SUM', 'teamsize:SUM'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = ['teamId'],
		options = {
			req: req,
			attributes: attributes,
			// startDate: true,
			// endDate: true,
			group: group
		},
		query = apis.getQuery(options);

	models.teamWiseOrganizationPerformance.findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
		console.log(err)
	    response.customErrorMessage(res, err.message);
	});
}