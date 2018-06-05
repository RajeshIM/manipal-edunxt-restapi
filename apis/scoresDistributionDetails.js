var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils');

exports.scoresDistributionDetails = function (req, res) {
	var LnDUserId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		courseId = req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		lndUserFilter = '',
		courseFilter = '',
		batchFilter = '',
		date = utils.getDates(req),
		dateFilter = '',
		query = '';

	if (LnDUserId) lndUserFilter = ` LnDUserId = ${LnDUserId}`;
	if (courseId) courseFilter = ` AND courseId = ${courseId}`;
	if (!_.isEmpty(batchId)) {
		batches = '(' + batchId.toString() + ')';
		batchFilter = ` AND batchId IN ` + batches;
	}
	query = `SELECT learnerId, learnerName, serialNumber, team, courseId, batchId, 
				scoreAvg,muln_Get_Batch_Name(batchId) AS batchName,noOfAttempts,
				IFNULL(muln_Get_Learner_Score_Distribution_Progress
				(LnDUserId, courseId, batchId, learnerId, '${date.start}','${date.end}'),0) 
				AS Progress FROM muln_Learner_Score_Distribution GROUP BY ScoreRanges`;

	dateFilter = ` AND DATE BETWEEN '${date.start}' AND '${date.end}' GROUP BY learnerId, courseId, batchId`;
	
    //query = query + lndUserFilter + courseFilter + batchFilter + dateFilter;
   
	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}