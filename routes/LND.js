var router = require('express').Router(),
	apis = require('./../apis/LnD');

router.get('/active-users', apis.activeUsers);
router.get('/learner-pace', apis.learnerPace);
router.get('/learner-engagement', apis.learnerEngagement);
router.get('/feedback', apis.feedback);
router.get('/time-spent', apis.timeSpent);
router.get('/learning-activities', apis.learningActivities);
router.get('/goals', apis.goals);
router.post('/active-users-graph', apis.daywiseActiveUsers);
router.post('/activity-by-location', apis.userActivityByLocation);
router.post('/learner-pace-performance', apis.learnerPaceAndPerformance);
router.post('/learner-pace-performance-details', apis.learnerPaceAndPerformanceDetails);
router.post('/learner-performance-progress', apis.learnerPerformanceAndProgress);
router.post('/learner-performance-progress-details', apis.learnerPerformanceAndProgressDetails);
router.post('/scores-distribution', apis.scoresDistribution);
router.post('/scores-distribution-details', apis.scoresDistributionDetails);
router.post('/trainer-leaderboard', apis.trainerLeaderBoard);
router.post('/learner-leaderboard', apis.learnerLeaderBoard);
router.post('/team-leaderboard', apis.teamLeaderBoard);
router.post('/content-consumption', apis.contentConsumption);
router.post('/organization-interests', apis.organizationInterests);
router.post('/organization-interests-details', apis.organizationInterestsDetails);
router.get('/courses-dropdown', apis.coursesDropDown);
router.get('/dropDown', apis.dropDowns);

module.exports = router;