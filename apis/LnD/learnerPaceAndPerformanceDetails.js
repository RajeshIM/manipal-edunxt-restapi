var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var type = req.query.type ? req.query.type.toUpperCase() : '',
		date = utils.getDates(req),
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		learnerType = (type === 'PACE') ? 'learnerPaceType' : 'learnerPerformanceType',
		displayFor = req.query.displayFor ? req.query.displayFor: null,
		attributes = ['learnerPaceType','learnerPerformanceType','LnDUserId', 'courseId', 'batchId', 
					  'teamId', 'teamLeaderId', 'learnerId', 'learnerName', 'serialNumber', 'courseName', 
					  'teamName', 'batchName', 'teamLeaderName', 'scoreInCourse', 'scoreAvg', 
					  'highestScore', 'actionMessage'],
		options = {
			req: req,
			attributes: attributes
		},
		query = apis.getQuery(options),
		table = '';

	if (!_.contains(['PACE', 'PERFORMANCE'], type)) {
		displayFor = 'noData';
	}
	
	if (displayFor) {
		query.where[learnerType] = { [models.Op.like]: '%' + displayFor + '%' };
	}
    if (date.current) {
    	table = 'learnerTrackDetails';
    } else {
    	table = 'daywiseLearnerTrackDetails';
    	query.where.day = date.end;
    }
 
	models[table].findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
