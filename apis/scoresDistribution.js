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
		batchFilter = '',
		examTypeFilter = '',
		dateFilter = '',
		filters = '',
		group = '',
		query = '';

   	if (LnDUserId) {
		lndUserFilter = ` LnDUserId = ${LnDUserId}`;
	}

	if (courseId){
		courseFilter = ` courseId = ${courseId}`;
	} 

    if (type === 'QUIZ') {
		examTypeFilter = ` examTypeId = 1`;
	} else if (type === 'ASSIGNMENT') {
		examTypeFilter = ` examTypeId = 5`;
	}

	if (!_.isEmpty(batchId)) {
		batches = '(' + batchId.toString() + ')';
		batchFilter = ` batchId IN ` + batches;
	}

	dateFilter = ` DATE BETWEEN '${date.start}' AND '${date.end}'`;   

   filters = LnDUserId ? lndUserFilter : '';
   filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseFilter) : 
   				(courseId ? courseFilter : filters);
   filters = (filters.length > 0 && examTypeFilter.length > 0) ? (filters + ' AND' + examTypeFilter): 
   	   		(examTypeFilter.length > 0 ? examTypeFilter : filters);
   filters = (filters.length > 0 & batchFilter.length > 0) ? (filters + ' AND' + batchFilter) : 
   	   		(batchFilter.length > 0 ? batchFilter : filters);
   filters = (filters.length > 0 & dateFilter.length > 0) ? (filters + ' AND' + dateFilter) : 
   	   		(dateFilter.length > 0 ? dateFilter : filters);
   filters = (filters.length > 0) ? (' where ' + filters) : '';

   query = `SELECT CASE WHEN ScoreAvg BETWEEN 0 AND 19 THEN '0-20'
						 WHEN ScoreAvg BETWEEN 20 AND 39 THEN '21-40'
						 WHEN ScoreAvg BETWEEN 40 AND 59 THEN '41-60'
						 WHEN ScoreAvg BETWEEN 60 AND 79 THEN '61-80'
						 WHEN ScoreAvg BETWEEN 80 AND 100 THEN '81-100'
				END AS scoreRanges, COUNT(ScoreAvg) AS numberOfUsers
				FROM muln_Learner_Score_Distribution`;

	group = ` GROUP BY ScoreRanges`;

  	query = query + filters + group;

	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}