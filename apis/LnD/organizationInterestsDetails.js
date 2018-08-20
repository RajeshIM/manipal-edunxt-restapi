var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.organizationInterestsDetails = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10;

	apis.getOrganizationInterestsDetails(req, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			var result = apis.getPaginationObject(data, page, limit);
	    	response.sendSuccessResponse(res, result.data, null, result.pagination);
		}
	});
}