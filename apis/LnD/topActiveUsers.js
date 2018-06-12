var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.topActiveUsers = function (req, res) {
	var query = {
		attributes: ['personId']
	}
	models.topActiveUsers.findAll(query).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}