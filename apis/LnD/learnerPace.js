var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.learnerPace = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		courseId = req.query.courseId ? parseInt(req.query.courseId): null,
		attributes = ['aheadSchedule', 'behindSchedule', 'onTrack', 'haveNotStarted'],
		learnerPaceOptions = {
			req: req,
			attributes: attributes,
			endDate: true
		},
		learnerPaceQuery = apis.getQuery(learnerPaceOptions),
		table = courseId ? 'courseWiseLearnerPace': 'allCoursesLearnerPace',
		responseData = {};
		
	models[tenant+'_'+table].findOne(learnerPaceQuery).then(function (data) {
		if (data) {
			responseData.aheadSchedule = data.aheadSchedule ? parseFloat(data.aheadSchedule || 0) : 0;
			responseData.onTrack = data.onTrack ? parseFloat(data.onTrack || 0) : 0;
			responseData.behindSchedule = data.behindSchedule ? parseFloat(data.behindSchedule || 0) : 0;
			responseData.haveNotStarted = data.haveNotStarted ? parseFloat(data.haveNotStarted || 0) : 0;
		}
		response.sendSuccessResponse(res, responseData);	
	}).catch(function (err) {
				response.customErrorMessage(res, err.message);
	});
	

}