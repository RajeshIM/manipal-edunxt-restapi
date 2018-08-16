var router = require('express').Router(),
	apis = require('./../apis/LnD'),
	csv = require('./../apis/LnD/csvs');

router.get('/active-users', apis.activeUsers);
router.get('/learner-pace', apis.learnerPace);
router.get('/learner-engagement', apis.learnerEngagement);
router.get('/feedback', apis.feedback);
router.get('/time-spent', apis.timeSpent);
router.get('/users-trained', apis.usersTrained);
router.get('/learner-performance-progress', apis.learnerPerformanceAndProgress);
router.post('/scores-distribution', apis.scoresDistribution);
router.post('/scores-distribution-details', apis.scoresDistributionDetails);
router.post('/learner-pace-performance', apis.learnerPaceAndPerformance);
router.post('/learner-pace-performance-details', apis.learnerPaceAndPerformanceDetails);
router.post('/content-consumption', apis.contentConsumption);
router.post('/team-leaderboard', apis.teamLeaderBoard);
router.post('/trainer-leaderboard', apis.trainerLeaderBoard);
router.post('/learner-leaderboard', apis.learnerLeaderBoard);
router.post('/organization-interests', apis.organizationInterests);
router.post('/organization-popular-topics', apis.organizationPopularTopics);
router.post('/organization-interests-details', apis.organizationInterestsDetails);
router.get('/programs-dropdown', apis.programDropDown);
router.get('/courses-dropdown', apis.coursesDropDown);
router.get('/batches-dropdown', apis.batchesDropDown);
router.get('/sections-dropdown', apis.sectionsDropDown);
router.get('/filters', apis.filters);

router.get('/content-consumption/csv', csv.contentConsumption);

module.exports = router;