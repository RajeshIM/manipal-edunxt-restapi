var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.learnerPerformanceAndProgressDetails = function (req, res) {
	var attributes = ['courseName', 'courseStartDate', 'courseEndDate', 'studentCount',
					  'programStatus', 'completionAvg', 'testScoreAvg', 'highestScore'],
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true
		},
		query = apis.getQuery(options),
		displayFor = req.body.displayFor ? req.body.displayFor: null,
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10;

	if(displayFor) query.where.programStatus = displayFor;


	models.learnerPerformanceAndProgressDetails.findAll(query).then(function (data) {
	    // data = data ? data : {};
	    // var pagination = apis.getPaginationObject(data.count, page, limit);
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
