var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.activeUsersByLocation = function (req, res) {	
	
	apis.getActiveUsersByLocationData(req, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			response.sendSuccessResponse(res, data);
		}
	});
}