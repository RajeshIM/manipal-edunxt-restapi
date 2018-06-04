var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	async = require('async');

exports.organizationInterests = function (req, res) {
	var interestsAttributes = ['courseId', 'courseName', 'hits', 'hitsSinceLastMonth'],
		interestsquery = apis.getQuery(req, interestsAttributes);
		interestsquery.order = [['hits', 'DESC']];
		interestsquery.limit = 5;

	var topicsAttributes = ['courseId', 'courseName'],
		topicsquery = apis.getQuery(req, topicsAttributes);
		topicsquery.distinct = true;
		topicsquery.order = [['numberLikes', 'DESC']];
		topicsquery.limit = 10;

	var responseData = {};

	async.parallel({
		topInterestsData: function (next) {
			models.organizationsInterests.findAll(interestsquery).then(function (data) {
			    next(null,data);
			}).catch(function (err) {
			    next(err);
			});
		},
		popularTopicsData: function (next) {
			models.organizationsInterests.findAll(query).then(function (data) {
			    next(null,data);
			}).catch(function (err) {
			    next(err);
			});
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
		    responseData.topInterestsData = results.topInterestsData;
		    responseData.popularTopicsData = results.popularTopicsData;
		    response.sendSuccessResponse(res, responseData);
		}
	});
}