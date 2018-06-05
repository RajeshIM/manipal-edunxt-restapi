var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	async = require('async');

exports.dropDowns = function (req, res) {
	var LnDUserId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		types = req.query.type ? req.query.type.split(',') : [],
		courseQuery = {},
		batchQuery = {},
		teamQuery = {},
		zoneQuery = {},
		where = {},
		attributes = [],
		isCourse = false,
		isBatch = false,
		isTeam = false,
		isZone = false,
		responseData = {};

	if (LnDUserId) {
		where.LnDUserId = LnDUserId;
		courseQuery.where = where;
		batchQuery.where = where;
		teamQuery.where = where;
		zoneQuery.where = where;
	}

	if (types.length > 0) {
		_.each(types, function(type) {
			switch(type.toUpperCase()) {
				case 'COURSE': attributes = ['courseId', 'courseName'];
							   courseQuery.attributes = attributes;
							   courseQuery.distinct = true;
							   isCourse = true;
							   break;
				case 'BATCH': attributes = ['batchId', 'batchName'];
							  batchQuery.attributes = attributes;
							  batchQuery.distinct = true;
							  isBatch = true;
							  break;
				case 'TEAM': attributes = ['teamId', 'teamName'];
				             teamQuery.attributes = attributes;
				             teamQuery.distinct = true;
				             isTeam = true;
							 break;
			    case 'ZONE': attributes = ['zoneId', 'zoneName'];
			    			 zoneQuery.attributes = attributes;
			    			 zoneQuery.distinct = true;
			    			 isZone = true;
							 break;
			}
		})
	};
	
	async.parallel({
		coursesData: function (next) {
			if (isCourse) {
				models.coursesDropDown.findAll(courseQuery).then(function (data) {
				    next(null, data);
				}).catch(function (err) {
				    next(err);
				});
			} else {
				next(null, []);
			}
		},
		batchesData: function (next) {
			if (isBatch) {
				models.coursesDropDown.findAll(batchQuery).then(function (data) {
				    next(null, data);
				}).catch(function (err) {
				    next(err);
				});
			} else {
				next(null, []);
			}
		},
		teamsData: function (next) {
			if (isTeam) {
				models.coursesDropDown.findAll(teamQuery).then(function (data) {
				    next(null, data);
				}).catch(function (err) {
				    next(err);
				});
			} else {
				next(null, []);
			}
		},
		zonesData: function (next) {
			if (isZone) {
				models.coursesDropDown.findAll(zoneQuery).then(function (data) {
				    next(null, data);
				}).catch(function (err) {
				    next(err);
				});
			} else {
				next(null, []);
			}
		}

	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
		    var courseData = results.coursesData,
		    	batchesData = results.batchesData,
		    	teamsData = results.teamsData,
		    	zonesData = results.zonesData;

		    if (courseData.length > 0) responseData.courses = courseData;
		    if (batchesData.length > 0) responseData.batches = batchesData;
		    if (teamsData.length > 0) responseData.teams = teamsData;
		    if (zonesData.length > 0) responseData.zones = zonesData;

		    response.sendSuccessResponse(res, responseData);
		}
	});
}