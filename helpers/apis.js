var utils = require('./utils'),
	moment = require('moment'),
	Sequelize = require('sequelize');
	
/** Function to get request filters
 *
 * @param {Object} req all the request data
 * @param {Boolean} pagination To add pagination data
 * @return {Object} Returns all the filters
 */

exports.getQuery = function (options) {
	var req = options.req,
		attributes = options.attributes,
		group = options.group,
		LnDUserId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		courseId =  req.headers['courseid'] ? parseInt([req.headers['courseid']]) : null,
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		zoneId = req.body.zoneId ? _.flatten([req.body.zoneId]) : [],
		teamId = req.body.teamId ? _.flatten([req.body.teamId]) : [],
		//displayFor = req.body.displayFor ? _.flatten([req.body.displayFor]): [],
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
	
	if(LnDUserId) where.LnDUserId = LnDUserId;
	if(courseId) where.courseId = courseId;
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