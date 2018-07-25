var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async');

exports.learnerPaceAndPerformance = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		learnerPaceQuery = '',
		learnerPerformanceQuery = '',
		query = '',
		paceData = {},
		performanceData = {},
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
							
	async.parallel({
		paceData: function(next){
			models[tenant].query(learnerPaceQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				next(null, data);		
			}).catch(function (err) {
				next(err);	
			});
		},
		performanceData: function(next){
			models[tenant].query(learnerPerformanceQuery, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
				next(null, data);		
			}).catch(function (err) {
				next(err);	
			});
		}
	},function(err, result){
		if(err) {
			response.customErrorMessage(res, err.message);
		}else{
			var paceInfo = result.paceData,
				performanceInfo = result.performanceData;

			paceData.aheadSchedule = paceInfo.length>0 ? Math.round(paceInfo[0].aheadSchedule || 0) : 0;
			paceData.onTrack = paceInfo.length>0 ? Math.round(paceInfo[0].onTrack || 0) : 0;
			paceData.behindSchedule = paceInfo.length>0 ? Math.round(paceInfo[0].behindSchedule || 0) : 0;
			paceData.haveNotStarted = paceInfo.length>0 ? Math.round(paceInfo[0].haveNotStarted || 0) : 0;

			performanceData.excelling = performanceInfo.length>0 ? Math.round(performanceInfo[0].excelling || 0) : 0;
			performanceData.passing = performanceInfo.length>0 ? Math.round(performanceInfo[0].passing || 0) : 0;
			performanceData.struggling = performanceInfo.length>0 ? Math.round(performanceInfo[0].struggling || 0) : 0;
			performanceData.haveNotStarted = performanceInfo.length>0 ? Math.round(performanceInfo[0].haveNotStarted || 0) : 0;

			responseData.paceData = paceData;
			responseData.performanceData = performanceData;
			response.sendSuccessResponse(res, responseData);
		}
	})
}