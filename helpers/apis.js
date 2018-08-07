var utils = require('./utils'),
	moment = require('moment'),
	Sequelize = require('sequelize');
	
/** Function to generate query dynamically based on the request filters
 *
 * @param {Object} options list of params needed to prepare the query
 * @return {Object} Returns an object
 */

exports.getQuery = function (options) {
	var req = options.req,
		attributes = options.attributes,
		group = options.group,
		userId = parseInt(req.headers['user-id'] || 0),
		userType = req.headers['user-type'] || null,
		courseId =  parseInt(req.query.courseId || 0),
		programId =  parseInt(req.query.programId || 0),
		type = req.query.type? req.query.type.toUpperCase(): '',
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		zoneId = req.body.zoneId ? _.flatten([req.body.zoneId]) : [],
		teamId = req.body.teamId ? _.flatten([req.body.teamId]) : [],
		contentType = req.body.contentType ? _.flatten([req.body.contentType]) : [],
		quizName = req.body.quizName ? _.flatten([req.body.quizName]) : [],
		assignmentName = req.body.assignmentName ? _.flatten([req.body.assignmentName]) : [],
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
	if(courseId) where.courseId = courseId;
	if(programId) where.programId = programId;
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
	} else if (options.endDate) {
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

exports.getFiltersForRawQuery = function(req, isJoin) {
	var userId =  parseInt([req.headers['user-id']] || 0),
		userType = req.headers['user-type'] ? req.headers['user-type'] : null,
		courseId =  parseInt(req.query.courseId || 0),
		programId =  parseInt(req.query.programId || 0),
		batchId = req.body.batchId ?  _.flatten([req.body.batchId]) : [],
		scoreType = req.query.type ? req.query.type.toUpperCase() : null,
		quizName = req.body.quizName ?_.flatten([req.body.quizName]): [],
		assignmentName = req.body.assignmentName ? _.flatten([req.body.assignmentName]): [],
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
	if (courseId){
		courseIdFilter = isJoin ?  ` df.course_id = ${courseId}`: ` course_id = ${courseId}`;
	}
	if (programId){
		programIdFilter = isJoin ? ` df.program_id = ${programId}`: ` program_id = ${programId}`;
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
exports.getAttributes = function(tenant, attributes) {
	var results = [],
		sequelize = models.sequelize;
	_.each(attributes, function (attr) {
		var split = attr.split(':'),
			aggregation = [models[tenant].fn(split[2],models[tenant].col(split[1])), split[0]];
		results.push(aggregation);
	});
	return results;
}