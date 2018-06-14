var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async');

exports.learningActivities = function (req, res) {
	var date = utils.getDates(req),
		type = req.query.type ? req.query.type.toUpperCase() : '',
		activeUserFields = ['totalActiveUsers:SUM', 'activeUsersSinceLastMonth:SUM', 'enrolledUsers:SUM','enrolledUsersSinceLastMonth:SUM'],
		learnerFields = ['usersCompletedTraining:SUM', 'usersCompletedTrainingSinceLastMonth:SUM','usersBehindSchedule:SUM', 
							'usersHaveNotStarted:SUM','usersOnTrack:SUM','usersAheadSchedule:SUM'],
		feedbackFields = ['learnerSatisfaction:AVG','learnerSatisfactionBy:AVG','trainerRating:AVG',
						'trainerRatingBy:AVG','contentRating:AVG','contentRatingBy:AVG'],
		totalFields = (type === 'ORG') ? feedbackFields : _.union(learnerFields, feedbackFields),
		userAttributes = apis.getAttributes(activeUserFields),
		learnerAttributes = apis.getAttributes(totalFields),
		userOptions = {
			req: req,
			attributes: userAttributes
		},
		learnerOptions = {
			req: req,
			//endDate: true,
			attributes: learnerAttributes
		},
		userQuery = apis.getQuery(userOptions),
		learnerQuery = apis.getQuery(learnerOptions),
		responseData = {};

	//userQuery.where.date = date.currentDate;

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

	async.parallel({
		activeUsersData: function(next) {
			models.learningActivities.findAll(userQuery).then(function(data) {
				data = !_.isEmpty(data) ? data[0] : null;
				if (data) {
					activeUsers.activeUsers = data.totalActiveUsers ? parseInt(data.totalActiveUsers) : 0;
					activeUsers.changeInUsers = data.activeUsersSinceLastMonth ? parseInt(data.activeUsersSinceLastMonth) : 0;
					activeUsers.peopleCurrentlyEnrolled = data.enrolledUsers ? parseInt(data.enrolledUsers) : 0;
					activeUsers.usersSinceLastMonth = data.enrolledUsersSinceLastMonth ? parseInt(data.enrolledUsersSinceLastMonth) : 0;
				}
				next(null, activeUsers);
			}).catch(function(err) {
				next(err);
			});
		},
		learnerData: function(next) {
			models.learningActivities.findAll(learnerQuery).then(function(data) {
				data = !_.isEmpty(data) ? data[0] : null;

				if (data) {

					if (type !== 'ORG') {
						learnerEngagement.peopleCompletedTraining = data.usersCompletedTraining ? parseInt(data.usersCompletedTraining) : 0;
						learnerEngagement.peopleChange = data.usersCompletedTrainingSinceLastMonth ? parseInt(data.usersCompletedTrainingSinceLastMonth) : 0;

						learnerPace.behindSchedule = data.usersBehindSchedule ? parseInt(data.usersBehindSchedule) : 0;
						learnerPace.haventStarted = data.usersHaveNotStarted ? parseInt(data.usersHaveNotStarted) : 0;
						learnerPace.onTrack = data.usersOnTrack ? parseInt(data.usersOnTrack) : 0;
						learnerPace.aheadOfSchedule = data.usersAheadSchedule ? parseInt(data.usersAheadSchedule) : 0;
					}

					feedback.learnerSatisfaction = data.learnerSatisfaction ? parseFloat(data.learnerSatisfaction) : 0;
			        feedback.learnerSatisfactionChange = data.learnerSatisfactionBy ? parseFloat(data.learnerSatisfactionBy) : 0;
			        feedback.trainerRating = data.trainerRating ? parseFloat(data.trainerRating) : 0;
			        feedback.trainerRatingChange = data.trainerRatingBy ? parseFloat(data.trainerRatingBy) : 0;
			        feedback.contentRating = data.contentRating ? parseFloat(data.contentRating) : 0;
			        feedback.contentRatingChange = data.contentRatingBy ? parseFloat(data.contentRatingBy) : 0;
				}

				next(null, {
					learnerEngagement: learnerEngagement,
					learnerPace: learnerPace,
					feedback: feedback
				});
			}).catch(function(err) {
				next(err);
			});	
		}
	}, function(err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			var activeUsersData = results.activeUsersData,
				learnerData = results.learnerData;

			responseData.activeUsers = activeUsersData;
			responseData.feedback = learnerData.feedback;
			if (type !== 'ORG') {
				responseData.learnerEngagement = learnerData.learnerEngagement;
				responseData.learnerPace = learnerData.learnerPace;
			}
			response.sendSuccessResponse(res, responseData);
		}			
	});
}