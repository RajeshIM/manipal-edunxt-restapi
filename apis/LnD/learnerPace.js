var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.learnerPace = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		table = courseId ? 'muln_course_wise_daily_learner_pace ': 'muln_all_courses_daily_learner_pace ',
		dateFilter = date.currentStatus ? 'where load_date=DATE(now()) ' : `where load_date=DATE('${date.end}') `,
		filters = apis.getFiltersForRawQuery(req, false),
		learnerPaceQuery = '',
		responseData = {};

   	learnerPaceQuery = `select aheadschedule, ontrack, behindschedule,have_not_started as havenotstarted  
						from `+ table + dateFilter + filters;
	
	models[tenant].query(learnerPaceQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
			responseData.aheadSchedule = data.length>0 ? parseFloat(data[0].aheadschedule || 0) : 0;
			responseData.onTrack = data.length>0 ? parseFloat(data[0].ontrack || 0) : 0;
			responseData.behindSchedule = data.length>0 ? parseFloat(data[0].behindschedule || 0) : 0;
			responseData.haveNotStarted = data.length>0 ? parseFloat(data[0].havenotstarted || 0) : 0;
			response.sendSuccessResponse(res, responseData);	
	}).catch(function (err) {
			response.customErrorMessage(res, err.message);
	});
	

}