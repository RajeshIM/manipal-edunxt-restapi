var response = require('./../../helpers/response'),
	utils = require('./../../helpers/utils'),
	apis = require('./../../helpers/apis');

exports.coursesAndProgramsDropDown = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		userId = parseInt([req.headers['user_id']] || 0),
		userType = req.headers['user_type'],
		filters = '';

	if (userId) {
		filters = ' and user_id='+userId;	
	}else if(userType){
		filters = filters.length > 0 ? filters + ' and user_type='+ userType : ' and user_type='+ userType;
	}

	var query = `SELECT * FROM (
					SELECT program_id AS programId, course_id AS courseId,
						   CONCAT(program_name, '-',course_name) AS courseName FROM muln_enrolled_persons 
						   WHERE load_date>='${date.start}' `+ filters + ` ORDER BY load_date DESC
				 )a group by 1,2`;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}