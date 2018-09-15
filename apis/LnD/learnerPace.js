var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.learnerPace = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		query = '',
		responseData = {
			aheadSchedule: 0,
			behindSchedule: 0,
			onTrack: 0,
			haveNotStarted: 0
		};

	query = `select pacetype, AVG(pacetype_count) AS pacetype_count
				from (SELECT pacetype,load_date, COUNT( person_id) as pacetype_count 
						FROM muln_daily_learner_track_details 
				where pacetype IS NOT NULL and load_date BETWEEN '${date.start}' AND '${date.end}'`+ filters +
				` group by 1,2) pace group by 1`;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		if (data.length > 0) {
			data.forEach(function(obj){
				if(obj.pacetype){
					switch(obj.pacetype.toUpperCase()){
						case 'AHEADSCHEDULE': responseData.aheadSchedule = Math.round(obj.pacetype_count || 0);
											  break;
						case 'BEHINDSCHEDULE': responseData.behindSchedule = Math.round(obj.pacetype_count || 0);
											   break;
						case 'ONTRACK': responseData.onTrack = Math.round(obj.pacetype_count || 0);
										break;
						case 'HAVE NOT STARTED': responseData.haveNotStarted = Math.round(obj.pacetype_count || 0);
					}
				}
			})
		}else{
			responseData = {};
		}
		response.sendSuccessResponse(res, responseData);		
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});	
}