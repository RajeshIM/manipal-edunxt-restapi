var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.programDropDown = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		table = 'enrolledPrograms',
		attributes = [[models[tenant].fn('DISTINCT',models[tenant].col('program_id')), 'id'],'name'],
		options = {
					req:req,
					attributes: attributes
				  },
		query = apis.getQuery(options);

	delete query.where.date;
	
	models[tenant+'_'+table].findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}