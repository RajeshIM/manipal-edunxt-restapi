var apis = ['activeUsers',
			'learnerEngagement',
			'learnerPace',
			'feedback',
			'timeSpent',
			'usersTrained',
			'coursesDropDown',
			'learnerPerformanceAndProgress',
			'scoresDistribution',
			'scoresDistributionDetails',
			'filters',
			'learnerPaceAndPerformance',
			'learnerPaceAndPerformanceDetails',
			'contentConsumption',
			'teamLeaderBoard',
			'trainerLeaderBoard',
			'learnerLeaderBoard',
			'organizationInterests',
			'organizationPopularTopics',
			'organizationInterestsDetails',
			'programDropDown',
			'batchesDropDown',
			'sectionsDropDown',
			'coursesAndProgramsDropDown',
			'activeUsersLineGraph',
			'activeUsersByLocation',
			'modeOfDelivery',
			'sendMail',
			'personData',
			'authLnDUser',
			'getReportGeneratedTime'
			];

apis.forEach(function (api) {
  // Exporting APIs as a module
  module.exports[api] = require(__dirname + '/' + api)[api];
});