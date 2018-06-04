var apis = ['learningActivities',
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
			'sample'
			];

apis.forEach(function (api) {
  // Exporting APIs as a module
  module.exports[api] = require(__dirname + '/' + api)[api];
});