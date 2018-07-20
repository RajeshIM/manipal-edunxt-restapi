var apis = ['activeUsers',
			'learnerEngagement',
			'learnerPace',
			'feedback',
			'timeSpent',
			'usersTrained',
			'coursesDropDown',
			'learnerPerformanceAndProgress',
			'scoresDistribution'
			];

apis.forEach(function (api) {
  // Exporting APIs as a module
  module.exports[api] = require(__dirname + '/' + api)[api];
});