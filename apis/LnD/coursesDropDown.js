var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.coursesDropDown = function (req, res) {	
	var LnDUserId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		orgHeadId = req.headers['orgheadid'] ? parseInt([req.headers['orgheadid']]) : null,
		filters = '';

	if (LnDUserId) {
		filters = ' where user_id='+LnDUserId;	
	}
	else if(orgHeadId) {
		filters = ' where user_id='+orgHeadId;
	}

	var query = `select distinct program_id as progaramId, course_id as id,CONCAT(program_name, '-',course_name) as name from muln_im_user_courses`;
	query = query + filters;
	
	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}