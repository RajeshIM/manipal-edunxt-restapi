var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.scoresDistributionDetails = function (req, res) {
	var LnDUserId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		courseId = req.headers['courseid'] ? parseInt(req.headers['courseid']) : null,
		page = req.query.page ? req.query.page : 1,
		limit = req.query.limit ? req.query.limit : 10,
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
   filters = (filters.length > 0) ? (' where' + filters) : '';

   query = `SELECT learnerId, learnerName, serialNumber, team, courseId, batchId, 
				scoreAvg,muln_Get_Batch_Name(batchId) AS batchName,noOfAttempts,
				IFNULL(muln_Get_Learner_Score_Distribution_Progress
				(LnDUserId, courseId, batchId, learnerId, '${date.start}','${date.end}'),0) 
				AS Progress FROM muln_Learner_Score_Distribution`;

	group = ' GROUP BY learnerId, courseId, batchId';
	
    query = query + filters + group;
 
	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}