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
		userId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		userType = req.headers['user-type'] ? req.headers['user-type'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		zoneId = req.body.zoneId ? _.flatten([req.body.zoneId]) : [],
		teamId = req.body.teamId ? _.flatten([req.body.teamId]) : [],
		//displayFor = req.query.displayFor ? req.query.displayFor: [],
		page = req.query.page ? parseInt(req.query.page) : null,
		limit = req.query.limit ? parseInt(req.query.limit): null,
		sortBy = req.query.sortBy ? req.query.sortBy : null,
		sortOrder = req.query.order ? req.query.order : null,
		searchBy = req.query.searchBy ? req.query.searchBy : null,
		searchTerm = req.query.searchTerm ? req.query.searchTerm  : null,
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

exports.getFiltersForRawQuery = function(req, isJoin) {
	var userId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		userType = req.headers['user-type'] ? req.headers['user-type'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
		userIdFilter = '',
		userTypeFilter = '',
		courseIdFilter = '',
		programIdFilter = '',
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

	filters = userId ? userIdFilter : '';
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
	filters = (filters.length > 0) ? (' AND ' + filters) : '';
	
	return filters;
};

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

/** Function to get the aggregated attributes
 *
 * @param {Object} attributes list of columns to be aggregated
 * @return {Array} Returns an Array
 */
exports.getAttributes = function(attributes) {
	var results = [],
		sequelize = models.sequelize;
	_.each(attributes, function (attr) {
		var split = attr.split(':'),
			aggregation = [sequelize.fn(split[1], sequelize.col(split[0])), split[0]];
		results.push(aggregation);
	});
	return results;
}