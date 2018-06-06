var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.learnerPerformanceAndProgress = function (req, res) {
	var attributes = ['courseName', 'batchName', 'performance', 'progress'],
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true
		},
		query = apis.getQuery(options);

	models.learnerPerformanceAndProgress.findAll(query).then(function (data) {
		data = _.groupBy(data, function (obj) {
			return obj.courseName;
		})
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
