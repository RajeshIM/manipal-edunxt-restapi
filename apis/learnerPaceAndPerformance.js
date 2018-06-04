var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	utils = require('../helpers/utils');

exports.learnerPaceAndPerformance = function (req, res) {
	var date = utils.getDates(req),
		fields = (req.query.type === 'pace') ? ['learnerPaceType'] : ['learnerPerformanceType'],
		aggFields = ['learnerId:COUNT'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = (req.query.type === 'pace') ? ['learnerPaceType'] : ['learnerPerformanceType'],
		query = apis.getQuery(req, attributes, false, group),
		table = '';

    if (date.current) {
    	table = 'learnerTrackDetails';
    } else {
    	table = 'daywiseLearnerTrackDetails';
    	query.where.day = date.end;
    }
    var paceData = {
    	"aheadOfSchedule": 0,
    	"behindSchedule": 0,
    	"onTrack": 0,
    	"haveNotStarted": 0
    },
    performanceData = {
    	"excelling": 0,
    	"passing": 0,
    	"struggling": 0
    },
    responseData = {};
  
	models[table].findAll(query).then(function (data) {
		if (req.query.type === 'pace') {
			if (!_.isEmpty(data)) {
				_.each(data, function(obj) {
					obj = obj ? obj.toJSON() : {};
					switch(obj.learnerPaceType) {
						case 'AheadOfSchedule':  paceData.aheadOfSchedule = obj.learnerId;
										   		 break;
						case 'BehindSchedule':   paceData.behindSchedule = obj.learnerId;
										         break;
						case 'OnTrack': 		 paceData.onTrack  = obj.learnerId;
										         break;
					    case 'HaveNotStarted': 	 paceData.haveNotStarted  = obj.learnerId;
										         break;
					}
				})
			}
			responseData = paceData;
		} else if (req.query.type === 'performance') {
			if (!_.isEmpty(data)) {
				_.each(data, function(obj) {
					obj = obj ? obj.toJSON() : {};
					switch(obj.learnerPerformanceType) {
						case 'Excelling':  performanceData.excelling = obj.learnerId;
										   break;
						case 'Passing':    performanceData.passing = obj.learnerId;
										   break;
						case 'Struggling': performanceData.struggling = obj.learnerId;
										   break;
					}
				})
			}
			responseData = performanceData;
		}

	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
		console.log(err)
	    response.customErrorMessage(res, err.message);
	});
}

