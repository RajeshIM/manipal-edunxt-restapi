var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.trainerLeaderBoard = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['LnDUserId','trainerId','trainerName', 'actionMessage'],
		aggFields = ['trainingsConducted:SUM', 'peopleTrained:SUM', 'avgRating:AVG'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = ['trainerId'],
		options = {
			req: req,
			attributes: attributes,
			startDate: false,
			endDate: true,
			group: group
		},
		query = apis.getQuery(options);

	models.trainerWiseOrganizationPerformance.findAll(query).then(function (data) {
	    var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
		console.log(err)
	    response.customErrorMessage(res, err.message);
	});
}