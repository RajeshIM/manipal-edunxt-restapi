var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.modeOfDelivery = function (req, res) {	
	apis.getModeOfDeliveryData(req, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			response.sendSuccessResponse(res, data);
		}
	});
}