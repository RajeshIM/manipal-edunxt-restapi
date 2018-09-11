var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var type = req.query.type ? req.query.type.toUpperCase() : '',
		fn = (type==='PERFORMANCE') ? 'getLearnerPerformanceData': 'getLearnerPaceData',
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10;

	apis[fn](req, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			var result = apis.getPaginationObject(data, page, limit);
	    	response.sendSuccessResponse(res, result.data, null, result.pagination);
		}
	});
}
