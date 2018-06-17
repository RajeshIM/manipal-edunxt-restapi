var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

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

   query = `SELECT CASE WHEN ScoreAvg BETWEEN 0 AND 20 THEN '0-20'
						 WHEN ScoreAvg BETWEEN 21 AND 40 THEN '21-40'
						 WHEN ScoreAvg BETWEEN 41 AND 60 THEN '41-60'
						 WHEN ScoreAvg BETWEEN 61 AND 80 THEN '61-80'
						 WHEN ScoreAvg BETWEEN 81 AND 100 THEN '81-100'
				END AS scoreRanges, COUNT(ScoreAvg) AS numberOfUsers
				FROM muln_Learner_Score_Distribution`;

	group = ` GROUP BY ScoreRanges`;

  	query = query + filters + group;

  	var result = [{
  		'scoreRanges': '0-20',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '21-40',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '41-60',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '61-80',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '81-100',
  		'numberOfUsers': 0
  	}];

	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
		if (data.length > 0) {
			for (var i in result) {
				var obj = _.findWhere(data, {scoreRanges: result[i].scoreRanges});
				if (!_.isEmpty(obj)) {
					result[i].scoreRanges = obj.scoreRanges.split('-');
					result[i].scoreRanges[0] = parseInt(result[i].scoreRanges[0]);
					result[i].scoreRanges[1] = parseInt(result[i].scoreRanges[1]);
					result[i].numberOfUsers = obj.numberOfUsers;
				} else {
					result[i].scoreRanges = result[i].scoreRanges.split('-');
					result[i].scoreRanges[0] = parseInt(result[i].scoreRanges[0]);
					result[i].scoreRanges[1] = parseInt(result[i].scoreRanges[1]);
				}
			}
		} else {
			result = [];
		}
	    response.sendSuccessResponse(res, result);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}