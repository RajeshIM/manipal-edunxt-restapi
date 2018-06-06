var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.learnerLeaderBoard = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['learnerId','learnerName', 'learnerSerialNumber', 'actionMessage'],
		aggFields = ['pointsEarned:SUM', 'pointsEarnedSinceLastMonth:SUM', 'testPerformance:AVG', 'avgTestPerformance:AVG', 'examScore:AVG'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = ['learnerId'],
		options = {
			req: req,
			attributes: attributes,
			// startDate: true,
			// endDate: true,
			group: group
		},
		query = apis.getQuery(options);

	models.learnerWiseOrganizationPerformance.findAll(query).then(function (data) {
		// data = data ? data : {};
		//var pagination = apis.getPaginationObject(data.count, page, limit);
	    response.sendSuccessResponse(res, data, null);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}