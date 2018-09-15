var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.activeUsersLineGraph = function (req, res) {	
	apis.getActiveUsersLineGraphData(req, function(err, data) {
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			response.sendSuccessResponse(res, data);
		}
	})
}