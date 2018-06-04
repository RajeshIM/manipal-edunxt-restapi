var response = require('../helpers/response'),
	apis = require('../helpers/apis');

exports.organizationInterestsDetails = function (req, res) {
	var page = req.query.page ? parseInt(req.query.page) : 1,
		limit = req.query.limit ? parseInt(req.query.limit) : 10
		attributes = ['courseName', 'hits', 'hitsSinceLastMonth', 'noFollowers', 'followersSinceLastMonth', 'videoTags', 'articalTags', 'avgRating'],
		query = apis.getQuery(req, attributes);

	models.organizationsInterests.findAll(query).then(function (data) {
		// data = data ? data : {};
		// var pagination = apis.getPaginationObject(data.count, page, limit);
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}