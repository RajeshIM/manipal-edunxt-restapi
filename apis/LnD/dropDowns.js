var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
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
		responseData = [];

	if (LnDUserId) {
		where.LnDUserId = LnDUserId;
		courseQuery.where = where;
		batchQuery.where = where;
		teamQuery.where = where;
		zoneQuery.where = where;
	}
		var courseAttributes = [['courseId', 'id'], ['courseName', 'name']],
		batchAttributes = [['batchId', 'id'], ['batchName', 'name']],
		teamAttributes = [['teamId', 'id'], ['teamName', 'name']],
		zoneAttributes = [['zoneId', 'id'], ['zoneName', 'name']];


		courseQuery.attributes = courseAttributes;
		courseQuery.distinct = true;
		batchQuery.attributes = batchAttributes;
		batchQuery.distinct = true;
		teamQuery.attributes = teamAttributes;
		teamQuery.distinct = true;
		zoneQuery.attributes = zoneAttributes;
		zoneQuery.distinct = true;

	if (types.length > 0) {
		_.each(types, function(type) {
			switch(type.toUpperCase()) {
				case 'COURSE': isCourse = true;
							   break;
				case 'BATCH' : isBatch = true;
							   break;
				case 'TEAM'  : isTeam = true;
							   break;
			    case 'ZONE'  : isZone = true;
							   break;
				default		 : isCourse = true;
						 	   isBatch = true;
						       isTeam = true;
						       isZone = true;
			}
		})
	} else {
		isCourse = true;
		isBatch = true;
	    isTeam = true;
		isZone = true;
	}
	
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
		    var courses = {
		    	type: 'course',
		    	data: []
		    },
		    teams = {
		    	type: 'team',
		    	data: []
		    },
		    zones = {
		    	type: 'zone',
		    	data: []
		    },
		    batches = {
		    	type: 'batch',
		    	data: []
		    };


		    if (courseData.length > 0) {
		    	courses.data = courseData;
		    	responseData.push(courses);
		    }
		    if (batchesData.length > 0) {
		    	batches.data = batchesData;
		    	responseData.push(batches);
		    }
		    if (teamsData.length > 0) {
		    	teams.data = teamsData;
		    	responseData.push(teams);
		    }
		    if (zonesData.length > 0) {
		    	zones.data = zonesData;
		    	responseData.push(zones);
		    }

		    response.sendSuccessResponse(res, responseData);
		}
	});
}