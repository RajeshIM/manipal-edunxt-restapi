var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.timeSpent = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		courseId = parseInt(req.query.courseId || 0),
		table = courseId ? 'courseWiseTimeSpent': 'allCoursesTimeSpent',
		attributes = ['durationSpent', 'courseDuration', 'timeSpentPercentage', 'expectedTimeSpentPercentage'],
		options = {
			req: req,
			attributes: attributes,
			currentDate: true
		}, 
		query = apis.getQuery(options),
		responseData = {
			timeSpent: 0,
			expectedTimeSpent: 0,
			durationSpent: 0,
			courseDuration: 0
		};
   
    models[tenant+'_'+table].findOne(query).then(function (data) {
    	if (data) {
    		responseData.timeSpent = data.timeSpentPercentage ? parseFloat(data.timeSpentPercentage) : 0;
    		responseData.expectedTimeSpent = data.expectedTimeSpentPercentage ? parseFloat(data.expectedTimeSpentPercentage) : 0;
    		responseData.durationSpent = data.durationSpent ? parseInt(parseFloat(data.durationSpent || 0)/60) : 0;
    		responseData.courseDuration = data.courseDuration ? parseInt(parseFloat(data.courseDuration || 0)/60) : 0;
    	}
		response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});

}