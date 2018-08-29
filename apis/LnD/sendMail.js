var MailService = require('./../../mail-service/mail.service'),
	response = require('./../../helpers/response');

exports.sendMail = function (req, res) {
	 MailService(req.body, function(err, data){
	 	if(err) {
	 		response.customErrorMessage(res, err.message);
	 	}else{
	 		response.sendSuccessResponse(res, data);
	 	}
	 })
}