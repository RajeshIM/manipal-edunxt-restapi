var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		type = req.query.type ? req.query.type.toUpperCase() : '',
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		learnerType = (type === 'PACE') ? 'paceType' : 'performanceType',
		displayFor = req.query.displayFor ? req.query.displayFor: null,
		loadDate = [models[tenant].fn('MAX',models[tenant].col('load_date')), 'date'],
		attributes = ['learnerName', 'serialNumber', 'courseName', 'programName', 'teamName', 'batchName',
					 'scoreInCourse', 'scoreAvg', 'highestScore', 'paceType', 'performanceType', loadDate],
		group = ['learnerName', 'serialNumber', 'courseName', 'programName', 'batchName', 'teamName'],
		options = {
			req: req,
			attributes: attributes,
			group: group
		},
		query = apis.getQuery(options),
		table = 'learnerPaceAndPerformanceDetails';

	if (!_.contains(['PACE', 'PERFORMANCE'], type)) {
		displayFor = 'noData';
	}
	
	if (displayFor) {
		query.where[learnerType] = { [models.Op.like]: '%' + displayFor + '%' };
	}
 
 
	models[tenant+'_'+table].findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
