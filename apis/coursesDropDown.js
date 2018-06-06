var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.coursesDropDown = function (req, res) {	
	var attributes = ['courseId', 'courseName'],
		options = {
			req: req,
			attributes: attributes
		},
		query = apis.getQuery(options);
		
	models.coursesDropDown.findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}