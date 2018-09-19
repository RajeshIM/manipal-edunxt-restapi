var response = require('./../../helpers/response'),
	utils = require('./../../helpers/utils'),
	apis = require('./../../helpers/apis');

exports.coursesAndProgramsDropDown = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		userId = parseInt([req.headers['user_id']] || 0),
		userType = req.headers['user_type'],
		group = ' group by 1,2',
		filters = '';

	if (userId) {
		filters = ' and user_id='+userId;	
	}else if(userType){
		filters = filters.length > 0 ? filters + ' and user_type='+ userType : ' and user_type='+ userType;
	}

	var query = `select program_id as programId, course_id as courseId,CONCAT(program_name, '-',course_name) as courseName from muln_enrolled_persons 
				  where load_date>='${date.start}' `;
	query = query + filters + group;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}