var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils');

exports.scoresDistribution = function (req, res) {
	var LnDUserId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		courseId = req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		type = req.query.type ? req.query.type.toUpperCase() : '',
		date = utils.getDates(req),
		courseFilter = '',
		batches = '',
		lndUserFilter = '',
		batchFilter = '';
		examTypeFilter = '',
		dateFilter = '',
		query = '';

	if (LnDUserId) lndUserFilter = ` LnDUserId = ${LnDUserId}`;

	if (!_.isEmpty(batchId)) {
		batches = '(' + batchId.toString() + ')';
		batchFilter = ` AND batchId IN ` + batches;
	}
	if (courseId) courseFilter = ` AND courseId = ${courseId}`;
	
	if (type === 'QUIZ') {
		examTypeFilter = ` where examTypeId = 1 `;
	} else if (type === 'ASSIGNMENT') {
		examTypeFilter = ` where examTypeId= 5`;
	} 

	query = `SELECT CASE WHEN ScoreAvg BETWEEN 0 AND 19 THEN '0-20'
						 WHEN ScoreAvg BETWEEN 20 AND 39 THEN '21-40'
						 WHEN ScoreAvg BETWEEN 40 AND 59 THEN '41-60'
						 WHEN ScoreAvg BETWEEN 60 AND 79 THEN '61-80'
						 WHEN ScoreAvg BETWEEN 80 AND 100 THEN '81-100'
				END AS scoreRanges, COUNT(ScoreAvg) AS numberOfUsers
				FROM muln_Learner_Score_Distribution`;
	var group = ` GROUP BY ScoreRanges`;

	dateFilter = ` AND DATE BETWEEN '${date.start}' AND '${date.end}' GROUP BY ScoreRanges`;



    //query = query + lndUserFilter + courseFilter + batchFilter + examTypeFilter + dateFilter;
  	query = query + examTypeFilter + group;
	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}