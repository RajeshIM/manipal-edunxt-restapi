var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.learnerPerformanceAndProgress = function (req, res) {
	var attributes = ['courseName', 'batchName', 'performance', 'progress'],
		options = {
			req: req,
			endDate: true,
			attributes: attributes
		},
		query = apis.getQuery(options),
		responseData = [];

	models.learnerPerformanceAndProgress.findAll(query).then(function (data) {
		data = _.groupBy(data, function (obj) {
			return obj.courseName;
		});
		
		if (!_.isEmpty(data)) {
			for (var key in data) {
				var courseData = data[key],
					courseObj = {};
				courseObj.courseName = key;
				courseObj.batches = courseData;
				responseData.push(courseObj);	
			}
		}
	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
