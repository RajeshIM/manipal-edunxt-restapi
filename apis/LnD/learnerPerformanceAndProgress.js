var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPerformanceAndProgress = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		courseId = req.query.courseId ? parseInt(req.query.courseId) : null,
		type = req.query.type ? req.query.type.toUpperCase() : null,
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		query = '',
		responseData = {};

	if (type === 'PROGRESS') {
		query = `select CONCAT(program_name,'-',course_name) AS courseName,ROUND(avg(progress),2) as progress from muln_course_wise_learner_progress where load_date between '${date.start}' and '${date.end}' ` + filters;
		query = courseId ? query: (query+ ' group by courseName');
	}else {
		query = `select CONCAT(program_name,'-',course_name) AS courseName,ROUND(avg(performance),2) as performance from muln_course_wise_learner_performance where load_date between '${date.start}' and '${date.end}' ` + filters;
		query = courseId ? query: (query+ ' group by courseName');
	}
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
			response.sendSuccessResponse(res, data);	
	}).catch(function (err) {
			response.customErrorMessage(res, err.message);
	});
}
