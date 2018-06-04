var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.learningActivities = function (req, res) {
	var fields = ['LnDUserId'],
		aggFields = ['totalActiveUsers:SUM', 'activeUsersSinceLastMonth:SUM', 'enrolledUsers:SUM','enrolledUsersSinceLastMonth: SUM',
					'usersCompletedTranning:SUM', 'usersCompletedTranningSinceLastMonth:SUM','usersBehindSchedule:SUM', 
					'usersHaveNotStarted:SUM','usersOnTrack:SUM','usersAheadSchedule:SUM','learnerSatisfaction:AVG','learnerSatisfactionBy:AVG', 'trainerRating:AVG',
					'trainerRatingBy:AVG','contentRating:AVG','contentRatingBy:AVG'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData), 
		query = apis.getQuery(req, attributes, true),
		responseData = {};
		
	models.learningActivities.findAll(query).then(function (data) {
		
		var activeUsers = {
			  	activeUsers: 0,
				changeInUsers: 0,
				peopleCurrentlyEnrolled: 0,
				usersSinceLastMonth: 0
			},
	    	learnerEngagement = {
	    		peopleCompletedTraining: 0,
	    		peopleChange: 0
	    	},
			learnerPace = {
				behindSchedule: 0,
				haventStarted: 0,
				onTrack: 0,
				aheadOfSchedule: 0
			},
			feedback = {
				learnerSatisfaction: 0,
				learnerSatisfactionChange: 0,
				trainerRating: 0,
				trainerRatingChange: 0,
				contentRating: 0,
				contentRatingChange: 0
			};
			
		data = !_.isEmpty(data) ? data[0] : null;
		if (data) {
			activeUsers.activeUsers = data.totalActiveUsers ? data.totalActiveUsers : 0;
			activeUsers.changeInUsers = data.activeUsersSinceLastMonth ? data.activeUsersSinceLastMonth : 0;
			activeUsers.peopleCurrentlyEnrolled = data.enrolledUsers ? data.enrolledUsers : 0;
			activeUsers.usersSinceLastMonth = data.enrolledUsersSinceLastMonth ? data.enrolledUsersSinceLastMonth : 0;

			learnerEngagement.peopleCompletedTraining = data.usersCompletedTranning ? data.usersCompletedTranning : 0;
			learnerEngagement.peopleChange = data.usersCompletedTranningSinceLastMonth ? data.usersCompletedTranningSinceLastMonth : 0;

			learnerPace.behindSchedule = data.usersBehindSchedule ? data.usersBehindSchedule : 0;
			learnerPace.haventStarted = data.usersHaveNotStarted ? data.usersHaveNotStarted : 0;
			learnerPace.onTrack = data.usersOnTrack ? data.usersOnTrack : 0;
			learnerPace.aheadOfSchedule = data.usersAheadSchedule ? data.usersAheadSchedule : 0;

			feedback.learnerSatisfaction = data.learnerSatisfaction ? data.learnerSatisfaction : 0;
	        feedback.learnerSatisfactionChange = data.learnerSatisfactionBy ? data.learnerSatisfactionBy : 0;
	        feedback.trainerRating = data.trainerRating ? data.trainerRating : 0;
	        feedback.trainerRatingChange = data.trainerRatingBy ? data.trainerRatingBy : 0;
	        feedback.contentRating = data.contentRating ? data.contentRating : 0;
	        feedback.contentRatingChange = data.contentRatingBy ? data.contentRatingBy : 0;
		}

        responseData.activeUsers = activeUsers;
        responseData.learnerEngagement = learnerEngagement;
        responseData.learnerPace = learnerPace;
        responseData.feedback = feedback;

	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}