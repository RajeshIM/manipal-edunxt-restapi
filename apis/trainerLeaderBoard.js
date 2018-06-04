var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.trainerLeaderBoard = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['LnDUserId','trainerId','trainerName', 'actionMessage'],
		aggFields = ['trainingsConducted:SUM', 'peopleTrained:SUM', 'avgRating:AVG'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = ['trainerId'],
		query = apis.getQuery(req, attributes, group);

	models.trainerWiseOrganizationPerformance.findAll(query).then(function (data) {
	    //var pagination = apis.getPaginationObject(data.count, page, limit);
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
		console.log(err)
	    response.customErrorMessage(res, err.message);
	});
}