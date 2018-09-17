var utils = require('./utils'),
	moment = require('moment'),
	Sequelize = require('sequelize');
	
/** Function to generate query dynamically based on the request filters
 *
 * @param {Object} options list of params needed to prepare the query
 * @return {Object} Returns an object
 */

function getQuery(options) {
	var req = options.req,
		attributes = options.attributes,
		group = options.group,
		userId = parseInt(req.headers['user_id'] || req.query['user_id']),
		userType = req.headers['user_type'] || req.query['user_type'],
		courseId =  parseInt(req.query.courseId || 0),
		programId =  parseInt(req.query.programId || 0),
		batch =  parseInt(req.query.batch || 0),
		sectionId =  parseInt(req.query.sectionId || 0),
		type = req.query.type? req.query.type.toUpperCase(): '',
		bodyParams = getBodyParams(req),
		batchId = bodyParams.batch,
		zoneId = bodyParams.zone,
		teamId = bodyParams.team,
		contentType = bodyParams.contenttype,
		quizName = bodyParams.quiz,
		assignmentName = bodyParams.assignment,
		//displayFor = req.query.displayFor ? req.query.displayFor: [],
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit | 10),
		sortBy = req.query.sortBy || null,
		sortOrder = req.query.order || null,
		searchBy = req.query.searchBy || null,
		searchTerm = req.query.searchTerm || null,
		query = {},
		where = {},
		order = [],
		obj = {},
		Op = Sequelize.Op,
		filters = {};
	
	if(userId) where.userId = userId;
	if(userType) where.userType = userType;
	if(programId) where.programId = programId;
	if(courseId) where.courseId = courseId;
	if(batch) where.batch = batch;
	if(sectionId) where.sectionId = sectionId;
	if(!_.isEmpty(batchId)) where.batchId = batchId;
	if(!_.isEmpty(zoneId)) where.zoneId = zoneId;
	if(!_.isEmpty(teamId)) where.teamId = teamId;
	if(!_.isEmpty(contentType)) where.contentType = contentType;
	if(type === 'QUIZ' && !_.isEmpty(quizName)) where.filterName = quizName; 
	if(type === 'ASSIGNMENT' && !_.isEmpty(assignmentName)) where.filterName = assignmentName; 
	
	var dateInfo = utils.getDates(req, true);
	
	if (options.startDate && options.endDate) {
		where.date = {
			[Op.gte]: dateInfo.start,
			[Op.lt]: dateInfo.end
		};
	}else if (options.endDate) {
		where.date = moment(dateInfo.end, __('YMD')).subtract(1, 'days').format(__('YMD'));
	} 
	if(options.lastMonth) {
		where.date = dateInfo.lastMonth;
	}
	if(options.currentDate) {
		where.date = dateInfo.currentDate;
	}

	if(sortBy && sortOrder) {
		var arr = [];
		arr.push(sortBy);
		arr.push(sortOrder);
		order.push(arr);
	}
	
	// if (page && limit) {
	// 	query.offset = (offset <= 1) ? 0 : ((offset-1) * limit);
	// 	query.limit = limit;
	// }

	if (searchBy && searchTerm) {
		var searchObj = { [Op.like]: '%' + searchTerm + '%' };
		where[searchBy] = searchObj;
	}

	query.where = where;
	
	if(attributes && !_.isEmpty(attributes)) query.attributes = attributes;
	if(!_.isEmpty(order)) query.order = order;
	if(group && !_.isEmpty(group)) query.group = group;

	return query;
}

function getBodyParams(req){
	var body = req.body,
		filters = {
			batch: [],
	    	quiz: [],
	    	assignment: [],
	    	location: [],
	    	team: [],
	    	zone: [],
	    	contenttype: []
		};
	if(body.length > 0){
		body.forEach(function(obj){
			switch(obj.type.toUpperCase()){
				case 'BATCH': filters.batch.push(obj.id);
				case 'QUIZ':  filters.quiz.push(obj.id);
				case 'ASSIGNMENT': filters.assignment.push(obj.id);
				case 'ZONE': filters.zone.push(obj.id);
				case 'TEAM': filters.team.push(obj.id);
				case 'CONTENTTYPE': filters.contenttype.push(obj.id);
			}
		})
	}
    return filters;
}
/** Function to get the pagination data
 *
 * @param {Array} total data received from DB
 * @param {Object} page page number
 * @param {Object} limit
 * @return {Object} Returns an object
 */
exports.getPaginationObject = function (total, page, limit) {
	page = page || 1;
	limit = limit || 10;
	var res = {},
		offset = (page - 1) * limit,
		data = _.rest(total, offset).slice(0, limit),
		count = total.length,
		pagination = {
			total: count,
			page: page,
			limit: limit,
			total_pages: Math.ceil(count / limit)
		};
		
	res.data = data;
	res.pagination = pagination;

	return res;
}

function getFiltersForRawQuery(req, isJoin) {
	var userId =  parseInt([req.headers['user_id']] || req.query['user_id']),
		userType = req.headers['user_type'] || req.query['user_type'],
		courseId =  parseInt(req.query.courseId || 0),
		programId =  parseInt(req.query.programId || 0),
		bodyParams = getBodyParams(req),
		batchId = bodyParams.batch,
		scoreType = req.query.type ? req.query.type.toUpperCase() : null,
		quizName = bodyParams.quiz,
		assignmentName = bodyParams.assignment,
		userIdFilter = '',
		userTypeFilter = '',
		courseIdFilter = '',
		programIdFilter = '',
		examTypeFilter = '',
		batches = '',
		batchFilter = '',
		moduleNameFilter = '',
		scoreData = [],
		str = '',
		filters = '';
	
	if (userId) {
		userIdFilter = isJoin ? ` df.user_id = ${userId}` : ` user_id = ${userId}`;
	}
	if (userType) {
		userTypeFilter = isJoin ? ` df.user_type = '${userType}'`: ` user_type = '${userType}'`;
	}
	if (programId){
		programIdFilter = isJoin ? ` df.program_id = ${programId}`: ` program_id = ${programId}`;
	}
	if (courseId){
		courseIdFilter = isJoin ?  ` df.course_id = ${courseId}`: ` course_id = ${courseId}`;
	}
	if (scoreType === 'QUIZ') {
		examTypeFilter = ` questionpapertype_id = 5`;
		scoreData = quizName;
	}else if(scoreType === 'ASSIGNMENT') {
		examTypeFilter = ` questionpapertype_id = 1`;
		scoreData = assignmentName;
	}
	if (!_.isEmpty(batchId)) {
		batches = '(' + batchId.toString() + ')';
		batchFilter = ` batch_id IN ` + batches;
	}
	
	if(scoreData.length>0){
		scoreData.forEach(function(val){
			var s = `'${val}'`;
			str = str.length>0 ? (str+','+s) : s;
		})
		str = str.length>0 ? ('('+str+')') : str;
		moduleNameFilter = ` module_name IN `+ str;
	}
    
	filters = userId ? userIdFilter : '';
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
    filters = (filters.length > 0 && examTypeFilter.length > 0) ? (filters + ' AND' + examTypeFilter) : 
   	   		(examTypeFilter.length > 0 ? examTypeFilter : filters);
   	filters = (filters.length > 0 && batchId.length > 0) ? (filters + ' AND' + batchFilter) : 
   	   		(batchId.length > 0 ? batchFilter : filters);
    filters = (filters.length > 0 && moduleNameFilter.length > 0) ? (filters + ' AND' + moduleNameFilter) : 
   	   		(moduleNameFilter.length > 0 ? moduleNameFilter : filters);
	filters = (filters.length > 0) ? (' AND ' + filters) : '';
	
	return filters;
}

/** Function to get the aggregated attributes
 *
 * @param {Object} attributes list of columns to be aggregated
 * @return {Array} Returns an Array
 */
function getAttributes(tenant, attributes) {
	var results = [],
		sequelize = models.sequelize;
	_.each(attributes, function (attr) {
		var split = attr.split(':'),
			aggregation = [models[tenant].fn(split[2],models[tenant].col(split[1])), split[0]];
		results.push(aggregation);
	});
	return results;
}

exports.getLearnerPaceData = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		displayFor = req.query.displayFor ? req.query.displayFor.replace('%20', ' ').replace('%20', ' '): null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		sortQuery = null,
		query = '';

	if(displayFor){
		filters = filters + `AND pacetype like '%${displayFor}%' `;
	}
	if(searchBy && searchTerm){
		filters = filters + ` AND person_name like '%${searchTerm}%' `;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}

   	query = `SELECT person_name AS learnerName, rollno AS serialNumber, course_name AS courseName,
			   program_name AS programName, courseinstancename AS teamName, batch_name AS batchName, 
			   ROUND(AVG(score),0) AS scoreInCourse, ROUND(AVG(score_avg),0) AS scoreAvg, 
			   ROUND(AVG(higest_score),0) AS highestScore, 
			   ROUND(AVG(if(score_percentage > 100, 100, score_percentage)),2) AS scorePercentage, 
			   ROUND(AVG(exam_accessed),0) AS examAccessed, ROUND(AVG(exam_passed),0) AS examPassed,
			   pacetype AS paceType, performance_type AS performanceType, MAX(load_date) AS DATE 
			FROM muln_daily_learner_track_details 
			WHERE load_date BETWEEN '${date.start}' AND '${date.end}' ` + filters + 
		`GROUP BY person_name, rollno, course_name, program_name, batch_name, courseinstancename `;
	query = sortQuery ? (query+sortQuery) : query;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getLearnerPerformanceData = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		displayFor = req.query.displayFor ? req.query.displayFor.replace('%20', ' ').replace('%20', ' '): null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		monthlyFilters = getFiltersForRawQuery(req, true),
		sortQuery = null,
		query = '';

	if(displayFor){
		monthlyFilters = monthlyFilters + `AND df.performance_type like '%${displayFor}%' `;
	}
	if(searchBy && searchTerm){
		monthlyFilters = monthlyFilters + ` AND df.person_name like '%${searchTerm}%' `;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}

   	query = `SELECT person_name AS learnerName, rollno AS serialNumber, course_name AS courseName,
			   program_name AS programName, courseinstancename AS teamName, batch_name AS batchName, 
			   score AS scoreInCourse, score_avg AS scoreAvg, higest_score AS highestScore, 
			   score_percentage AS scorePercentage, exam_accessed AS examAccessed, exam_passed AS examPassed,
			   pacetype AS paceType, performance_type AS performanceType, MAX(load_date) AS DATE 
			FROM muln_daily_learner_track_details df
			LEFT JOIN (
				SELECT section_id, person_id, ROUND(AVG(score_avg),0) AS scoreAvg, 
				   		MAX(higest_score) AS highestScore, 
				   		ROUND(AVG(if(score_percentage > 100, 100, score_percentage)),2) AS scorePercentage,
				   		SUM(exam_accessed) AS examAccessed,
				   		SUM(exam_passed) AS examPassed
				FROM muln_scoredistribution_personexams_count
			 	 WHERE load_date BETWEEN '${date.start}' AND '${date.end}' 
				GROUP BY 1,2
			) led
		ON df.courseinstance_id=led.section_id
		AND df.person_id=led.person_id
		WHERE df.load_date BETWEEN '${date.start}' AND '${date.end}' ` + monthlyFilters + 
		`GROUP BY person_name, rollno, course_name, program_name, batch_name, courseinstancename `;
	query = sortQuery ? (query+sortQuery) : query;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

// exports.getScoresDistributionDetails = function(req, next){
// 	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
// 		courseId =  parseInt(req.query.courseId || 0),
// 		type = req.query.type ? req.query.type.toUpperCase() : '',
// 		page = parseInt(req.query.page || 1),
// 		limit = parseInt(req.query.limit || 10),
// 	    fields = ['learnerName', 'serialNumber', 'team', 'batchName'],
// 		aggFields = ['noOfAttempts:no_of_attempts:AVG', 'Progress:progress:AVG', 'scoreAvg:scores_avg:AVG', 
// 					 'examsAttempted:number_of_exams_attempted:AVG', 'totalExamsCount:total_exams_count:AVG'],
// 		aggData = getAttributes(tenant, aggFields),
// 		attributes = _.union(fields, aggData),
// 		group = fields,
// 		options = {
// 			req: req,
// 			attributes: attributes,
// 			startDate: true,
// 			endDate: true,
// 			group: group
// 		},
// 		query = getQuery(options),
// 		Op = Sequelize.Op;
// 		table = courseId ? 'courseWiseScoresDistribution': 'allCoursesScores';

// 	if(type === 'QUIZ'){
// 		query.where.questionPaperId = 5;
// 	}else if(type === 'ASSIGNMENT'){
// 		query.where.questionPaperId = 1;
// 	}
	
// 	query.where['scoreAvg'] = {[Op.ne]: null};

// 	models[tenant+'_'+table].findAll(query).then(function (data) {
// 		next(null, data);
// 	}).catch(function (err) {
// 	    next(err);
// 	});
// }

exports.getScoresDistributionDetails = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		courseId =  parseInt(req.query.courseId || 0),
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		sortQuery = null,
		table = courseId ? 'muln_course_wise_scores': 'muln_all_courses_scores'
		query = '';

	if(searchBy && searchTerm){
		filters = filters + ` AND learner_name like '%${searchTerm}%'`;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}else{
		sortQuery = ` order by learnerName desc `;
	}

   	query = ` SELECT learnerName,serialNumber, team,
				batchName,ROUND(SUM(noOfAttempts),0) AS noOfAttempts, 
				ROUND(AVG(progress),0) AS Progress, ROUND(AVG(scoreAvg),0) AS scoreAvg, 
				ROUND(SUM(examsAttempted),0) AS examsAttempted, 
				ROUND(AVG(totalExamsCount), 0) AS totalExamsCount FROM 
				(
				SELECT learner_name AS learnerName,serial_no AS serialNumber, team_name AS team,
				batch_name AS batchName, questionpapertype_id, ROUND(AVG(no_of_attempts),0) AS noOfAttempts, 
				ROUND(AVG(progress),0) AS Progress, ROUND(AVG(if(scores_avg > 100, 100, scores_avg)),0) AS scoreAvg, 
				ROUND(AVG(number_of_exams_attempted),0) AS examsAttempted, 
				ROUND(AVG(total_exams_count), 0) AS totalExamsCount 
				FROM `+ table + ` WHERE load_date BETWEEN '${date.start}' AND '${date.end}' `+ filters + 
				` GROUP BY 1,2,3,4,5 ) sub Group by 1,2,3,4 ` + sortQuery;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

// exports.getTeamLeaderBoard = function(req, next){
// 	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
// 		page = parseInt(req.query.page || 1),
// 		limit = parseInt(req.query.limit || 10),
// 	    fields = ['teamName'],
// 		aggFields = ['completion:completion_percentage:AVG', 'completedProgram:completed_program:SUM', 'teamSize:team_size:SUM'],
// 		aggData = getAttributes(tenant, aggFields),
// 		attributes = _.union(fields, aggData),
// 		group = fields,
// 		options = {
// 			req: req,
// 			attributes: attributes,
// 			startDate: true,
// 			endDate: true,
// 			group: group
// 		},
// 		query = getQuery(options),
// 		table = 'teamWiseOrganizationPerformance';
	
// 	models[tenant+'_'+table].findAll(query).then(function (data) {
// 		next(null, data);
// 	}).catch(function (err) {
// 	    next(err);
// 	});
// }

exports.getTeamLeaderBoard = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		sortQuery = null,
		query = '';

	if(searchBy && searchTerm){
		filters = filters + ` AND team_name like '%${searchTerm}%'`;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}

   	query = ` select team_name as teamName, ROUND(AVG(completion_percentage),0) as completion, 
	   		         SUM(completed_program) AS completedProgram, SUM(team_size) as teamSize 
			  from muln_daily_team_organization_performance 
	 		       where load_date between '${date.start}' and '${date.end}' `+ filters + 
	 			   ` group by 1 ` ;
	query = sortQuery ? (query+sortQuery) : query;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

// exports.getTrainerLeaderBoard = function(req, next){
// 	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
// 		page = parseInt(req.query.page || 1),
// 		limit = parseInt(req.query.limit || 10),
// 	    fields = ['trainerId', 'trainerName'],
// 		aggFields = ['trainingsConducted:trainings_conducted:SUM', 'peopleTrained:people_trained:SUM', 
// 					 'avgRating:avg_rating:AVG'],
// 		aggData = getAttributes(tenant, aggFields),
// 		attributes = _.union(fields, aggData),
// 		group = fields,
// 		options = {
// 			req: req,
// 			attributes: attributes,
// 			startDate: true,
// 			endDate: true,
// 			group: group
// 		},
// 		query = getQuery(options),
// 		table = 'trainerWiseOrganizationPerformance';
	
// 	models[tenant+'_'+table].findAll(query).then(function (data) {
// 		next(null, data);
// 	}).catch(function (err) {
// 	    next(err);
// 	});
// }

exports.getTrainerLeaderBoard = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		sortQuery = null,
		query = '';

	if(searchBy && searchTerm){
		filters = filters + ` AND trainer_name like '%${searchTerm}%'`;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}

   	query = ` select trainer_id as trainerId, trainer_name as trainerName, 
   					 SUM(trainings_conducted) as trainingsConducted, 
	   		         SUM(people_trained) AS peopleTrained, 
	   		         ROUND(AVG(avg_rating),0) as avgRating 
			  from muln_daily_trainer_organization_performance 
	 		       where load_date between '${date.start}' and '${date.end}' `+ filters + 
	 			   ` group by 1,2 ` ;
	query = sortQuery ? (query+sortQuery) : query;
	
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getLearnerLeaderBoard = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		monthlyFilters = getFiltersForRawQuery(req, true),
		sortQuery = null,
		query = '';

	if(searchBy && searchTerm){
		monthlyFilters = monthlyFilters + ` AND df.person_name like '%${searchTerm}%'`;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}

   	query = `SELECT df.user_id, df.user_type, df.person_id, df.rollno AS learnerSerialNumber, 
	   	     		df.person_name AS learnerName, ROUND(AVG(df.points_earned),0) AS pointsEarned, 
	   				ROUND(AVG(df.test_performance),0) AS testPerformance, 
	   				ROUND(AVG(df.exam_score),0) AS examScore, 
	   				ROUND(AVG(df.avg_test_performance),0) AS avgTestPerformance, 
	   				op.last_month_points_earned AS pointsEarnedSinceLastMonth 
	   				FROM muln_daily_lerner_organization_performance AS df
			LEFT JOIN (SELECT user_id, user_type, person_id, rollno, person_name, 
				   			   ROUND(AVG(points_earned),0) AS last_month_points_earned 
						FROM muln_monthly_lerner_organization_performance 
	    				WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + `GROUP BY 1,2,3,4,5
			) AS op
			ON df.user_id=op.user_id AND 
   			   df.user_type=op.user_type AND 
   			   df.person_id=op.person_id 
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1,2,3,4,5`;
	query = sortQuery ? (query+sortQuery) : query;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getOrganizationInterestsDetails = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm : null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		order = req.query.order ? req.query.order : null,
		page = parseInt(req.query.page || 1),
		limit = parseInt(req.query.limit || 10),
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		monthlyFilters = getFiltersForRawQuery(req, true),
		sortQuery = null,
		query = '';
	
	if(searchBy && searchTerm){
		monthlyFilters = monthlyFilters + ` AND df.entity_name like '%${searchTerm}%'`;
	}
	if(sortBy && order){
		sortQuery = ` order by  ${sortBy} ${order} `;
	}
	
   	query = `SELECT df.user_id, df.user_type, df.course_id as courseId, df.program_id AS programId, 
   				df.entity_id as entityId, df.entity_name AS courseName,
	   	     	ROUND(AVG(df.hits),0) as hits,
	   	     	mo.monthly_hits as hitsSinceLastMonth,
	   	     	ROUND(avg(df.followers),0) as noOfFollowers,
	   	     	mo.monthly_followers as followersSinceLastMonth,
	   	     	ROUND(avg(df.video_tags),0) as videoTags,
	   	     	ROUND(avg(df.article_tags),0) as articleTags,
				ROUND(avg(df.avg_rating),0) as avgRating 
				FROM muln_organization_interests AS df
			LEFT JOIN (SELECT user_id, user_type, course_id, program_id, 
							  entity_id,ROUND(AVG(monthly_hits)) as monthly_hits,
							  ROUND(AVG(monthly_followers),0) as monthly_followers
				 	  FROM muln_monthly_organization_interests 
	    			  WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + `GROUP BY 1,2,3,4,5
			) AS mo
			ON df.user_id=mo.user_id AND 
   			   df.user_type=mo.user_type AND 
   			   df.course_id=mo.course_id AND
   			   df.program_id=mo.program_id 
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1,2,3,4,5`;
	query = sortQuery ? (query+sortQuery) : query;

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getContentConsumptionData = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['courseId', 'programId', 'courseName', 'contentId', 'contentName', 'contentType', 'author'],
		aggFields = ['views:views:AVG', 'avgRating:avg_rating:AVG', 'duration:duration:AVG'],
		aggData = getAttributes(tenant, aggFields),
		attributes = _.union(fields, aggData),
		group = ['courseId', 'programId', 'courseName', 'contentId', 'contentType', 'author'],
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true,
			group: group
		},
		query = getQuery(options),
		table = 'contentConsumption';
    
	models[tenant+'_'+table].findAll(query).then(function (data) {
		next(null, data);
	}).catch(function (err) {
	    next(err);
	});
}

exports.getActiveUsersLineGraphData = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		query = '';
	
   	query = `SELECT ROUND(SUM(faculty_count)/COUNT(DISTINCT course_id),0) AS facultyCount,
					ROUND(SUM(learner_count)/COUNT(DISTINCT course_id),0) AS learnerCount,
					load_date as date FROM muln_location_wise_daily_active_learners_faculties 
					where load_date between '${date.start}' and '${date.end}' `+ filters + ` Group by 3`;
			
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getModeOfDeliveryData = function(req, next){
	var tenant = req.headers['tenant_name'] || req.query['tenant_name'],
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		monthlyFilters = getFiltersForRawQuery(req, true),
		query = '';
	
   	query = `SELECT df.load_date as date,ROUND(AVG(df.learner_count), 0) AS onlineCount, 
	   				op.offline_learners_count AS offlineCount 
	   				FROM muln_location_wise_daily_active_learners_faculties AS df
			LEFT JOIN (SELECT  load_date,ROUND(AVG(offline_learners_count), 0) AS offline_learners_count
							   FROM muln_location_wise_daily_offline_learners_count 
	    				WHERE load_date BETWEEN '${date.start}' AND '${date.end}' `
	    				+ filters + `GROUP BY 1
			) AS op
			ON df.load_date = op.load_date
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1`;
			
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

exports.getActiveUsersByLocationData = function(req, next){
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		date = utils.getDates(req),
		filters = getFiltersForRawQuery(req, false),
		monthlyFilters = getFiltersForRawQuery(req, true),
		query = '';
	
   		query = `SELECT df.location,ROUND(AVG(df.faculty_count), 0) AS facultyCount, 
	   				ROUND(AVG(df.learner_count), 0) AS learnerCount, 
	   				op.monthly_faculty_count AS monthlyFacultyCount, 
	   				op.monthly_learner_count AS monthlyLearnerCount
	   				FROM muln_location_wise_daily_active_learners_faculties AS df
			LEFT JOIN (SELECT  location,ROUND(AVG(faculty_count), 0) AS monthly_faculty_count,
							   ROUND(AVG(learner_count), 0) AS monthly_learner_count 
							   FROM muln_location_wise_monthly_active_learners_faculties 
	    				WHERE load_date=DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%M-%Y') `
	    				+ filters + `GROUP BY 1
			) AS op
			ON df.location=op.location
			WHERE  df.load_date BETWEEN '${date.start}' AND '${date.end}' `+ monthlyFilters + 
			`GROUP BY 1 order by learnerCount desc`;
			
	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		next(null, data);			
	}).catch(function (err) {
		next(err);
	});
}

module.exports.getAttributes = getAttributes;
module.exports.getQuery = getQuery;
module.exports.getFiltersForRawQuery = getFiltersForRawQuery;