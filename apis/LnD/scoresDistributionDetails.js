var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.scoresDistributionDetails = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		courseId =  parseInt(req.query.courseId || 0),
		type = req.query.type ? req.query.type.toUpperCase() : '',
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
	    fields = ['learnerName', 'serialNumber', 'team', 'batchName'],
		aggFields = ['noOfAttempts:no_of_attempts:AVG', 'Progress:progress:AVG', 'scoreAvg:scores_avg:AVG'],
		aggData = apis.getAttributes(tenant, aggFields),
		attributes = _.union(fields, aggData),
		group = fields,
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true,
			group: group
		},
		query = apis.getQuery(options),
		table = courseId ? 'courseWiseScoresDistribution': 'allCoursesScores';
	if(type === 'QUIZ'){
		query.where.questionPaperId = 5;
	}else if(type === 'ASSIGNMENT'){
		query.where.questionPaperId = 1;
	}
	
	models[tenant+'_'+table].findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
