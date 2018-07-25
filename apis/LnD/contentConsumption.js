var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.contentConsumption = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10,
		fields = ['courseId', 'programId', 'courseName', 'contentName', 'contentType', 'author'],
		aggFields = ['views:views:AVG', 'avgRating:avg_rating:AVG', 'duration:duration:AVG'],
		aggData = apis.getAttributes(tenant, aggFields),
		attributes = _.union(fields, aggData),
		group = fields,
		options = {
			req: req,
			attributes: attributes,
			startDate: true,
			endDate: true,
			group: group
		},
		query = apis.getQuery(options),
		table = 'contentConsumption';
	
	models[tenant+'_'+table].findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}
