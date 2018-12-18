var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async');

exports.learnerPaceAndPerformance = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		monthlyFilters = apis.getFiltersForRawQuery(req, true),
		learnerPaceQuery = '',
		learnerPerformanceQuery = '',
		query = '',
		paceData = {
			aheadSchedule: 0,
			behindSchedule: 0,
			onTrack: 0,
			haveNotStarted: 0	
		},
		performanceData = {
			excelling: 0,
			passing: 0,
			struggling: 0,
			haveNotStarted: 0
		},
		responseData = {};

   	// learnerPaceQuery = `select pacetype, AVG(pacetype_count) AS pacetype_count
	// 					from (SELECT pacetype,load_date, COUNT(distinct person_id) as pacetype_count 
	// 							FROM muln_daily_learner_track_details 
	// 							where pacetype IS NOT NULL  and load_date BETWEEN '${date.start}' AND '${date.end}'`+ filters +
	// 						 ` group by 1,2) pace group by 1`;

	learnerPaceQuery = `SELECT pacetype, COUNT(person_id) AS pacetype_count FROM 
						(SELECT  person_id, person_name AS learnerName, rollno AS serialNumber, 
								 course_name AS courseName,program_name AS programName, 
				 				courseinstancename AS sectionName, batch_name AS batchName,
								pacetype AS paceType, performance_type AS performanceType, 
								MAX(load_date) AS DATE FROM muln_daily_learner_track_details 
						WHERE load_date BETWEEN '${date.start}' AND '${date.end}' ` + filters + 
						` GROUP BY person_id, person_name, rollno,course_name, program_name, 
						batch_name, courseinstancename) pace GROUP BY 1`;

	// learnerPerformanceQuery = `select performance_type, AVG(performance_type_count) AS performance_type_count
	// 							from (SELECT performance_type,load_date, COUNT(distinct person_id) as performance_type_count 
	// 									FROM muln_daily_learner_track_details 
	// 							where performance_type IS NOT NULL and load_date BETWEEN '${date.start}' AND '${date.end}'`+ filters +
	// 							   ` group by 1,2) pace group by 1`;
	
	learnerPerformanceQuery = ` SELECT performanceType,COUNT(*) as performance_type_count 
								FROM ( SELECT person_name AS learnerName, course_name AS courseName,
									  program_name AS programName, courseinstancename AS sectionName, 
									  batch_name AS batchName, pacetype AS paceType, performance_type AS performanceType, 
									  MAX(load_date) AS DATE FROM muln_daily_learner_track_details df 
									  LEFT JOIN ( SELECT section_id, person_id
									  FROM muln_scoredistribution_personexams_count 
									  WHERE load_date BETWEEN '${date.start}' AND '${date.end}' GROUP BY 1,2) led
								ON df.courseinstance_id=led.section_id AND df.person_id=led.person_id 
								WHERE df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters +` GROUP BY person_name, rollno, course_name, program_name, batch_name, courseinstancename )abc GROUP BY 1`;
	
			
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

			if (paceInfo.length > 0 && paceInfo[0].pacetype) {
				paceInfo.forEach(function(obj){
					if(obj.pacetype){
						switch(obj.pacetype.toUpperCase()){
							case 'AHEADSCHEDULE': paceData.aheadSchedule = Math.round(obj.pacetype_count || 0);
												  break;
							case 'BEHINDSCHEDULE': paceData.behindSchedule = Math.round(obj.pacetype_count || 0);
												   break;
							case 'ONTRACK': paceData.onTrack = Math.round(obj.pacetype_count || 0);
											break;
							case 'HAVE NOT STARTED': paceData.haveNotStarted = Math.round(obj.pacetype_count || 0);
						}
					}
				})
			}else{
				paceData = {};
			}
			if (performanceInfo.length > 0 && performanceInfo[0].performanceType) {
				performanceInfo.forEach(function(obj){
					if(obj.performanceType){
						switch(obj.performanceType.toUpperCase()){
							case 'EXCELLING': performanceData.excelling = Math.round(obj.performance_type_count || 0);
												  break;
							case 'PASSING': performanceData.passing = Math.round(obj.performance_type_count || 0);
												   break;
							case 'STRUGGLING': performanceData.struggling = Math.round(obj.performance_type_count || 0);
											break;
							case 'HAVE NOT STARTED': performanceData.haveNotStarted = Math.round(obj.performance_type_count || 0);
						}
					}
				})
			}else{
				performanceData = {};
			}

			responseData.paceData = paceData;
			responseData.performanceData = performanceData;
			response.sendSuccessResponse(res, responseData);
		}
	})
}