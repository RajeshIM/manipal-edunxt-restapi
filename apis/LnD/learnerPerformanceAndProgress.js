var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.learnerPerformanceAndProgress = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		type = req.query.type ? req.query.type.toUpperCase() : null,
		attributes = ['sectionId', 'sectionName'],
		performanceField = [[models[tenant].fn('AVG',models[tenant].col('performance')), 'actualPerformance'],
							[models[tenant].fn('AVG',models[tenant].col('expected_performance')), 'expectedPerformance']],
		progressField = [[models[tenant].fn('AVG',models[tenant].col('progress')), 'actualProgress'],
						 [models[tenant].fn('AVG',models[tenant].col('expected_progress')), 'expectedProgress']];
		attributes = (type==='PROGRESS') ? _.union(attributes, progressField) : _.union(attributes, performanceField),
	    table = (type==='PROGRESS') ? 'courseWiseLearnerProgress': 'courseWiseLearnerPerformance',
		group = ['sectionId'],
		options = {
			req: req,
			startDate: true,
			endDate: true,
			attributes: attributes,
			group: group
		},
		Op = models.Sequelize.Op,
		query = apis.getQuery(options);

	query.where['sectionName'] = {[Op.ne]: null};
	if(type==='PROGRESS') query.where['expectedProgress'] = {[Op.ne]: 0};
	
	models[tenant+'_'+table].findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
