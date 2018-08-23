var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.activeUsersLineGraph = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		table = 'locationWiseDailyActiveUsers',
		attributes = [[models[tenant].fn('SUM',models[tenant].col('faculty_count')), 'facultyCount'],
					  [models[tenant].fn('SUM',models[tenant].col('learner_count')), 'learnerCount'],'date'],
		options = {
					req:req,
					attributes: attributes,
					startDate: true,
					endDate: true,
					group: ['date']
				  },
		query = apis.getQuery(options);

	models[tenant+'_'+table].findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}