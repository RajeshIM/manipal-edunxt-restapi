var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.learnerPerformanceAndProgressDetails = function (req, res) {
	var attributes = ['courseName', 'courseStartDate', 'courseEndDate', 'studentCount',
					  'programStatus', 'completionAvg', 'testScoreAvg', 'highestScore'],
		options = {
			req: req,
			//endDate: true,
			attributes: attributes
		},
		query = apis.getQuery(options),
		displayFor = req.body.displayFor ? req.body.displayFor: null,
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10;

	if(displayFor) query.where.programStatus = displayFor;


	models.learnerPerformanceAndProgressDetails.findAll(query).then(function (data) {
	    var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
