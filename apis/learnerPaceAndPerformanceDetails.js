var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var type = req.query.type ? req.query.type.toUpperCase() : '',
		date = utils.getDates(req),
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		type = (type === 'PACE') ? 'learnerPaceType' : 'learnerPerformanceType',
		displayFor = req.body.displayFor ? req.body.displayFor: null,
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

	if (displayFor) {
		query.where[type] = { [models.Op.like]: '%' + displayFor + '%' };
	}
    if (date.current) {
    	table = 'learnerTrackDetails';
    } else {
    	table = 'daywiseLearnerTrackDetails';
    	//query.where.day = date.end;
    }
 
	models[table].findAll(query).then(function (data) {
		//data = data ? data : {};
		//var pagination = apis.getPaginationObject(data.count, page, limit);
	    response.sendSuccessResponse(res, data, null);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
