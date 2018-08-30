var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.personData = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		personId = parseInt(req.query.personId || 0),
		table = 'person',
		attributes = ['email', 'personId'],
		query = {
			where: {
				personId: personId
			},
			attributes: attributes
		};
   
    models[tenant+'_'+table].findOne(query).then(function (data) {
    	data = data ? data : {};
		response.sendSuccessResponse(res, data);
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});

}