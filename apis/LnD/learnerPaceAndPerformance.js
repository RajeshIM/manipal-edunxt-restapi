var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPaceAndPerformance = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		type = req.query.type ? req.query.type.toUpperCase(): 'PACE',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		learnerPaceQuery = '',
		learnerPerformanceQuery = '',
		query = '',
		responseData = {};

   	learnerPaceQuery = `select 	avg(aheadschedule) as aheadSchedule, 
								avg(behindschedule)	as behindSchedule, 
								avg(ontrack) as onTrack,
								avg(have_not_started) 	as haveNotStarted
						from (
							select load_date, 
								sum(aheadschedule) as aheadschedule, 
							    sum(behindschedule) as behindschedule, 
								sum(ontrack) as ontrack, 
								sum(have_not_started) 	as have_not_started
							from muln_course_batch_wise_daily_learner_pace 
							where load_date BETWEEN '${date.start}' AND '${date.end}'`+filters+
							` group by 1)pace`;
	learnerPerformanceQuery = `select avg(excelling) as excelling, 
								avg(passing)	as passing, 
								avg(struggling) as struggling,
								avg(have_not_started) 	as haveNotStarted
						from (
							select load_date, 
								sum(excelling) as excelling, 
							    sum(passing) as passing, 
								sum(struggling) as struggling, 
								sum(have_not_started) 	as have_not_started
							from muln_learner_performance_type_counts 
							where load_date BETWEEN '${date.start}' AND '${date.end}'`+filters+
							` group by 1)performance`;
							
	query = (type==='PERFORMANCE') ? learnerPerformanceQuery : learnerPaceQuery;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
			if(type==='PERFORMANCE') {
				responseData.excelling = data.length>0 ? Math.round(data[0].excelling || 0) : 0;
				responseData.passing = data.length>0 ? Math.round(data[0].passing || 0) : 0;
				responseData.struggling = data.length>0 ? Math.round(data[0].struggling || 0) : 0;
				responseData.haveNotStarted = data.length>0 ? Math.round(data[0].haveNotStarted || 0) : 0;	
			}else{
				responseData.aheadSchedule = data.length>0 ? Math.round(data[0].aheadSchedule || 0) : 0;
				responseData.onTrack = data.length>0 ? Math.round(data[0].onTrack || 0) : 0;
				responseData.behindSchedule = data.length>0 ? Math.round(data[0].behindSchedule || 0) : 0;
				responseData.haveNotStarted = data.length>0 ? Math.round(data[0].haveNotStarted || 0) : 0;
			}
			response.sendSuccessResponse(res, responseData);	
	}).catch(function (err) {
			response.customErrorMessage(res, err.message);
	});
}