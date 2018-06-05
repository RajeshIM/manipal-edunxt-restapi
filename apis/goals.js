var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils');

exports.goals = function (req, res) {
	var	date = utils.getDates(req),
		courseId = req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		attributes = ['durationSpent', 'courseDuration', 'timeSpentPercentage', 
					 'expectedTimeSpentPercentage','usersTrained','usersCompletedTraining', 
					 'usersCompleatedTrainingPercentage','usersCompleatedTrainingExpectedPercentage'],
		query = apis.getQuery(req, attributes),
		table = '';
		
	if (courseId) {
		table = 'coursewiseTimeSpent'
	} else {
		table = 'userwiseTimeSpent';
	}

    //query.where.date = date.end;

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
    		usersCompleatedTrainingPercentage: 0,
    		usersCompleatedTrainingExpectedPercentage: 0
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
			usersTrained.usersCompleatedTrainingPercentage = data.usersCompleatedTrainingPercentage ? parseFloat(data.usersCompleatedTrainingPercentage) : 0;
			usersTrained.usersCompleatedTrainingExpectedPercentage = data.usersCompleatedTrainingExpectedPercentage ? parseFloat(data.usersCompleatedTrainingExpectedPercentage) : 0;
		}
		responseData.timeSpent = timeSpent;
		responseData.usersTrained = usersTrained;
	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
