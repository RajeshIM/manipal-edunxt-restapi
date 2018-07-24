var router = require('express').Router(),
	apis = require('./../apis/LnD');

router.get('/active-users', apis.activeUsers);
router.get('/learner-pace', apis.learnerPace);
router.get('/learner-engagement', apis.learnerEngagement);
router.get('/feedback', apis.feedback);
router.get('/time-spent', apis.timeSpent);
router.get('/users-trained', apis.usersTrained);
router.get('/learner-performance-progress', apis.learnerPerformanceAndProgress);
router.post('/scores-distribution', apis.scoresDistribution);
router.post('/scores-distribution-filters', apis.scoresDistributionFilters);
router.post('/learner-pace-performance', apis.learnerPaceAndPerformance);
router.get('/courses-dropdown', apis.coursesDropDown);

module.exports = router;