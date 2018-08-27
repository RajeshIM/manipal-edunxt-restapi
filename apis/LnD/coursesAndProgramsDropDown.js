var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.coursesAndProgramsDropDown = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		userId = parseInt([req.headers['user_id']] || 0),
		filters = '';

	if (userId) {
		filters = ' where user_id='+userId;	
	}

	var query = `select distinct program_id as programId, course_id as courseId,CONCAT(program_name, '-',course_name) as courseName from muln_im_enrolled_courses`;
	query = query + filters;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}