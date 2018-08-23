var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.usersTrained = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		courseId =  parseInt(req.query.courseId || 0),
		table = courseId ? 'courseWisePersonsTrained': 'allCoursesPersonsTrained',
		attributes = ['trainedPercentage', 'completedTraining', 'totalLearners'],
		options = {
			req: req,
			attributes: attributes,
			currentDate: true
		}, 
		query = apis.getQuery(options),
		responseData = {
			trainedPercentage: 0,
			expectedtrainedPercentage: 0,
			completedTraining: 0,
			totalLearners: 0
		};
    
	models[tenant+'_'+table].findOne(query).then(function (data) {
		if (data) {
			responseData.trainedPercentage = data.trainedPercentage ? parseFloat(data.trainedPercentage || 0) : 0;	
			responseData.expectedtrainedPercentage = 0;
			responseData.completedTraining = data.completedTraining ? parseInt(data.completedTraining || 0) : 0;
			responseData.totalLearners = data.totalLearners ? parseInt(data.totalLearners || 0) : 0;
		}
		response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});

}