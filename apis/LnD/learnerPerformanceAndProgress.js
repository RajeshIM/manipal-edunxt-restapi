var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.learnerPerformanceAndProgress = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		type = req.query.type ? req.query.type.toUpperCase() : null,
		attributes = [[models[tenant].fn('CONCAT',models[tenant].col('program_name'),'-',models[tenant].col('course_name')), 'courseName']],
		performanceField = [[models[tenant].fn('AVG',models[tenant].col('performance')), 'performance']],
		progressField = [[models[tenant].fn('AVG',models[tenant].col('progress')), 'progress']];
		attributes = (type==='PROGRESS') ? _.union(attributes, progressField) : _.union(attributes, performanceField),
	    table = (type==='PROGRESS') ? 'courseWiseLearnerProgress': 'courseWiseLearnerPerformance',
		group = ['courseName'],
		options = {
			req: req,
			startDate: true,
			endDate: true,
			attributes: attributes,
			group: group
		},
		query = apis.getQuery(options);

	models[tenant+'_'+table].findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
