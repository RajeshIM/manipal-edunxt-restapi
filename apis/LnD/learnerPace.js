var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPace = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		query = '',
		responseData = {};

	query = `select avg(aheadschedule) as aheadSchedule, 
					avg(behindschedule)	as behindSchedule, 
					avg(ontrack) as onTrack,
					avg(have_not_started) as haveNotStarted
				from (select load_date, 
							 sum(aheadschedule) as aheadschedule, 
							 sum(behindschedule) as behindschedule, 
							 sum(ontrack) as ontrack, 
							 sum(have_not_started) as have_not_started
						from muln_course_batch_wise_daily_learner_pace 
				where load_date BETWEEN '${date.start}' AND '${date.end}'`+ filters +
				` group by 1) pace`;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		if (data.length > 0) {
			if(data[0].aheadSchedule || data[0].onTrack || data[0].behindSchedule || data[0].haveNotStarted){
				responseData.aheadSchedule = Math.round(data[0].aheadSchedule || 0);
				responseData.onTrack = Math.round(data[0].onTrack || 0);
				responseData.behindSchedule = Math.round(data[0].behindSchedule || 0);
				responseData.haveNotStarted = Math.round(data[0].haveNotStarted || 0);
			}
		}
		response.sendSuccessResponse(res, responseData);		
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});	
}