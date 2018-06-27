var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.goals = function (req, res) {
	var courseId = req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		programId =  req.headers['programid'] ? parseInt([req.headers['programid']]) : null,
		attributes = ['durationSpent', 'courseDuration', 'timeSpentPercentage', 
					 'expectedTimeSpentPercentage','usersTrained','usersCompletedTraining', 
					 'usersCompletedTrainingPercentage','usersCompletedTrainingExpectedPercentage'],
		options = {
			req: req,
			//endDate: true,
			attributes: attributes
		},
		query = apis.getQuery(options),
		table = 'userwiseTimeSpent';
		
	if (courseId) {
		table = 'coursewiseTimeSpent'
		if (programId) query.where.programId = programId;
	}

    var responseData = {},
    	timeSpent = {
    		timeSpent: 0,
    		totalTime: 0,
    		timeSpentPercentage: 0,
    		expectedTimeSpentPercentage: 0
    	},
    	usersTrained = {
    		usersTrained: 0,
    		usersCompletedTraining: 0,
    		usersCompletedTrainingPercentage: 0,
    		usersCompletedTrainingExpectedPercentage: 0
    	};
    
	models[table].findOne(query).then(function (data) {
		data = data ? data : {};
		if (!_.isEmpty(data)) {
			timeSpent.timeSpent = data.durationSpent ? parseInt(data.durationSpent) : 0;
			timeSpent.totalTime = data.courseDuration ? parseInt(data.courseDuration) : 0;
			timeSpent.timeSpentPercentage = data.timeSpentPercentage ? parseFloat(data.timeSpentPercentage) : 0;
			timeSpent.expectedTimeSpentPercentage = data.expectedTimeSpentPercentage ? parseFloat(data.expectedTimeSpentPercentage) : 0;
			usersTrained.usersTrained = data.usersTrained ? parseInt(data.usersTrained) : 0;
			usersTrained.usersCompletedTraining = data.usersCompletedTraining ? parseInt(data.usersCompletedTraining) : 0;
			usersTrained.usersCompletedTrainingPercentage = data.usersCompletedTrainingPercentage ? parseFloat(data.usersCompletedTrainingPercentage) : 0;
			usersTrained.usersCompletedTrainingExpectedPercentage = data.usersCompletedTrainingExpectedPercentage ? parseFloat(data.usersCompletedTrainingExpectedPercentage) : 0;
		}
		responseData.timeSpent = timeSpent;
		responseData.usersTrained = usersTrained;
	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
