var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.learningActivities = function (req, res) {
	var courseId =  req.headers['courseid'] ? parseInt([req.headers['courseid']]) : null,
		type = req.query.type ? req.query.type.toUpperCase() : '',
		userAttributes = ['activeUsersSinceLastMonth', 'enrolledUsers','enrolledUsersSinceLastMonth'],
		learnerAttributes = ['userCompletedTraining', 'usersCompletedTrainingSinceLastMonth','behindSchedule', 
							'usersHaveNotStarted','onTrack','aheadSchedule'],
		feedbackAttributes = ['currentLearnerSatisfaction','learnerSatisfactionBy','trainerRating',
								'trainerRatingBy','contentRating','contentRatingBy'],
		totalAttributes = (type === 'ORG') ? _.union(userAttributes, feedbackAttributes) : _.union(userAttributes, learnerAttributes, feedbackAttributes),
		options = {
			req: req,
			//endDate: true,
			attributes: totalAttributes
		},
		query = apis.getQuery(options),
		table = 'learningActivities',
		responseData = {};

	if (courseId) {
		table = 'courseWiseLearningActivities';
	}

	var activeUsers = {
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

	models[table].findOne(query).then(function(data) {
		data = data ? data : null;
		if (data) {
			activeUsers.changeInUsers = data.activeUsersSinceLastMonth ? parseFloat(data.activeUsersSinceLastMonth) : 0;
			activeUsers.peopleCurrentlyEnrolled = data.enrolledUsers ? parseFloat(data.enrolledUsers) : 0;
			activeUsers.usersSinceLastMonth = data.enrolledUsersSinceLastMonth ? parseFloat(data.enrolledUsersSinceLastMonth) : 0;
			if (type !== 'ORG') {
				learnerEngagement.peopleCompletedTraining = data.userCompletedTraining ? parseFloat(data.userCompletedTraining) : 0;
				learnerEngagement.peopleChange = data.usersCompletedTrainingSinceLastMonth ? parseFloat(data.usersCompletedTrainingSinceLastMonth) : 0;

				learnerPace.behindSchedule = data.behindSchedule ? parseFloat(data.behindSchedule) : 0;
				learnerPace.haventStarted = data.usersHaveNotStarted ? parseFloat(data.usersHaveNotStarted) : 0;
				learnerPace.onTrack = data.onTrack ? parseFloat(data.onTrack) : 0;
				learnerPace.aheadOfSchedule = data.aheadSchedule ? parseFloat(data.aheadSchedule) : 0;
			}

			feedback.learnerSatisfaction = data.currentLearnerSatisfaction ? parseFloat(parseFloat(data.currentLearnerSatisfaction).toFixed(2)) : 0;
			feedback.learnerSatisfactionChange = data.learnerSatisfactionBy ? parseFloat(parseFloat(data.learnerSatisfactionBy).toFixed(2)) : 0;
			feedback.trainerRating = data.trainerRating ? parseFloat(parseFloat(data.trainerRating).toFixed(2)) : 0;
			feedback.trainerRatingChange = data.trainerRatingBy ? parseFloat(parseFloat(data.trainerRatingBy).toFixed(2)) : 0;
			feedback.contentRating = data.contentRating ? parseFloat(parseFloat(data.contentRating).toFixed(2)) : 0;
		    feedback.contentRatingChange = data.contentRatingBy ? parseFloat(parseFloat(data.contentRatingBy).toFixed(2)) : 0;
		}
		responseData.activeUsers = activeUsers;
		responseData.feedback = feedback;
		if (type !== 'ORG') {
			responseData.learnerEngagement = learnerEngagement;
			responseData.learnerPace = learnerPace;
		}
		response.sendSuccessResponse(res, responseData);
	}).catch(function(err) {
		response.customErrorMessage(res, err.message);
	});
}