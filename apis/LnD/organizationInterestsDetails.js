var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.organizationInterestsDetails = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10
		fields = ['courseId', 'courseName'],
		aggFields = ['hits:SUM', 'hitsSinceLastMonth:SUM', 'noOfFollowers:SUM', 
					 'followersSinceLastMonth:SUM', 'videoTags:SUM', 'articalTags:SUM', 
					 'avgRating:AVG'],
		aggData = apis.getAttributes(aggFields),
		attributes = _.union(fields, aggData),
		group = ['courseId'],
		options = {
			req: req,
			group: group,
			//endDate: true,
			attributes: attributes
		},
		query = apis.getQuery(options);

	models.organizationsInterests.findAll(query).then(function (data) {
		var result = apis.getPaginationObject(data, page, limit);
	    response.sendSuccessResponse(res, result.data, null, result.pagination);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}