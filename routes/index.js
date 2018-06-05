var express = require('express'),
	router = express.Router(),
	apis = require('./../apis');

router.get('/api/v1/learning-activities', apis.learningActivities);
router.get('/api/v1/goals', apis.goals);
router.post('/api/v1/active-users-graph', apis.daywiseActiveUsers);
router.post('/api/v1/activity-by-location', apis.userActivityByLocation);
router.post('/api/v1/learner-pace-performance', apis.learnerPaceAndPerformance);
router.post('/api/v1/learner-pace-performance-details', apis.learnerPaceAndPerformanceDetails);
router.post('/api/v1/learner-performance-progress', apis.learnerPerformanceAndProgress);
router.post('/api/v1/learner-performance-progress-details', apis.learnerPerformanceAndProgressDetails);
router.post('/api/v1/scores-distribution', apis.scoresDistribution);
router.post('/api/v1/scores-distribution-details', apis.scoresDistributionDetails);
router.post('/api/v1/trainer-leaderboard', apis.trainerLeaderBoard);
router.post('/api/v1/learner-leaderboard', apis.learnerLeaderBoard);
router.post('/api/v1/team-leaderboard', apis.teamLeaderBoard);
router.post('/api/v1/content-consumption', apis.contentConsumption);
router.post('/api/v1/organization-interests', apis.organizationInterests);
router.post('/api/v1/organization-interests-details', apis.organizationInterestsDetails);
router.get('/api/v1/courses-dropdown', apis.coursesDropDown);
router.get('/api/v1/dropDown', apis.dropDowns);
router.get('/api/v1/sample', apis.sample);

module.exports = router;
