var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.coursesDropDown = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		table = 'enrolledCourses',
		attributes = [[models[tenant].fn('DISTINCT',models[tenant].col('course_id')), 'id'],'name'],
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