var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async');

exports.learnerPaceAndPerformance = function (req, res) {
	var type = req.query.type ? req.query.type.toUpperCase() : '',
		paceFields = ['learnerPaceType'],
		performanceFields = ['learnerPerformanceType'],
		aggFields = ['learnerId:COUNT'],
		date = utils.getDates(req),
		aggData = apis.getAttributes(aggFields),
		paceAttributes = _.union(paceFields, aggData),
		performanceAttributes = _.union(performanceFields, aggData),
		paceGroup = ['learnerPaceType'],
		performanceGroup = ['learnerPerformanceType'],
		paceOptions = {
			req: req,
			attributes: paceAttributes,
			group: paceGroup
		},
		paceQuery = apis.getQuery(paceOptions),
		performanceOptions = {
			req: req,
			attributes: performanceAttributes,
			group: performanceGroup
		},
		performanceQuery = apis.getQuery(performanceOptions),
		table = '';

    if (date.current) {
    	table = 'learnerTrackDetails';
    } else {
    	table = 'daywiseLearnerTrackDetails';
    	paceQuery.where.day = date.end;
    	performanceQuery.where.day = date.end;
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
  
  	async.parallel({
		paceData: function (next) {
			models[table].findAll(paceQuery).then(function (data) {
				if (!_.isEmpty(data)) {
					_.each(data, function(obj) {
						obj = obj ? obj.toJSON() : {};
						if (obj.learnerPaceType) {
							switch(obj.learnerPaceType.toUpperCase()) {
								case 'PACEAHEADSCHEDULE':  paceData.aheadOfSchedule = obj.learnerId;
													   	 break;
								case 'PACEBEHINDSCHEDULE':   paceData.behindSchedule = obj.learnerId;
													     break;
								case 'PACEUSERSONTRACK': 		 paceData.onTrack  = obj.learnerId;
													     break;
								case 'PACEHAVENOTSTARTED': 	 paceData.haveNotStarted  = obj.learnerId;
													     break;
						    }
						}
					})
				}
				next(null, paceData);
			}).catch(function (err) {
			    next(err);
			});
		},
		performanceData: function (next) {
			models[table].findAll(performanceQuery).then(function (data) {
				if (!_.isEmpty(data)) {
					_.each(data, function(obj) {
						obj = obj ? obj.toJSON() : {};
						if (obj.learnerPerformanceType) {
							switch(obj.learnerPerformanceType.toUpperCase()) {
								case 'EXCELLING': performanceData.excelling = obj.learnerId;
												  break;
								case 'PASSING': performanceData.passing = obj.learnerId;
												break;
								case 'STRUGGLING': performanceData.struggling = obj.learnerId;
											  	   break;
							}
						}
					})
				}
				next(null, performanceData);
			}).catch(function (err) {
			    next(err);
			});
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
		    responseData.paceData = results.paceData;
		    responseData.performanceData = results.performanceData;
		    response.sendSuccessResponse(res, responseData);
		}
	});
	
}

