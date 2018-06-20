var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.contentConsumption = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['LnDUserId','courseId', 'courseName','contentId','contentName', 'contentType', 'author'],
		aggFields = ['views:SUM', 'avgRating:AVG', 'duration:SUM'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = fields,
		options = {
			req: req,
			attributes: attributes,
			// startDate: true,
			// endDate: true,
			group: group
		},
		query = apis.getQuery(options);
	
	models.contentConsumption.findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
