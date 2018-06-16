var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.dropDowns = function (req, res) {
	var LnDUserId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		orgHeadId = req.headers['orgheadid'] ? parseInt([req.headers['orgheadid']]) : null,
		types = req.query.type ? req.query.type.split(',') : '',
		filters = '';
		isCourse = false,
		isBatch = false,
		isTeam = false,
		isZone = false,
		responseData = [];

		filters = LnDUserId ? 'LnDUserId='+LnDUserId : '';
   		filters = (filters.length > 0 && orgHeadId) ? (filters + ' AND ' + 'orgHeadId='+orgHeadId) : 
   				(orgHeadId ? 'orgHeadId='+orgHeadId : filters);
   		filters = (filters.length > 0) ? (' where ' + filters) : '';

   	var courseQuery = 'select distinct courseId as id, courseName as name from muln_Im_LNDUser_Course' + filters,
   	zoneQuery = 'select distinct zoneId as id, zoneName as name from muln_Im_LNDUser_Course' + filters,
   	batchQuery = 'select distinct batchId as id, batchName as name from muln_Im_LNDUser_Course' + filters,
   	teamQuery = 'select distinct teamId as id, teamName as name from muln_Im_LNDUser_Course' + filters;


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
				models.sequelize.query(courseQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
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
				models.sequelize.query(batchQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
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
				models.sequelize.query(teamQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
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
				models.sequelize.query(zoneQuery, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
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