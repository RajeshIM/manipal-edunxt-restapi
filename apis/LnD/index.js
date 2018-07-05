var apis = ['activeUsers',
			'learnerEngagement',
			'learnerPace',
			'feedback',
			'timeSpent',
			'usersTrained',
			'learningActivities',
			'goals',
			'daywiseActiveUsers',
			'userActivityByLocation',
			'learnerPaceAndPerformance',
			'learnerPaceAndPerformanceDetails',
			'learnerPerformanceAndProgress',
			'learnerPerformanceAndProgressDetails',
			'scoresDistribution',
			'scoresDistributionDetails',
			'trainerLeaderBoard',
			'learnerLeaderBoard',
			'teamLeaderBoard',
			'contentConsumption',
			'organizationInterests',
			'organizationInterestsDetails',
			'coursesDropDown',
			'dropDowns'
			];

apis.forEach(function (api) {
  // Exporting APIs as a module
  module.exports[api] = require(__dirname + '/' + api)[api];
});