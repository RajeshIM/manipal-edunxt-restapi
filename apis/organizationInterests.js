var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	async = require('async');

exports.organizationInterests = function (req, res) {
	var interestsAttributes = ['courseId', 'courseName', 'hits', 'hitsSinceLastMonth'],
		interestsOptions = {
			req: req,
			attributes: interestsAttributes
		},
		interestsquery = apis.getQuery(interestsOptions);
		interestsquery.order = [['hits', 'DESC']];
		interestsquery.limit = 3;

	var topicsAttributes = ['courseId', 'courseName'],
		topicsOptions = {
			req: req,
			attributes: topicsAttributes
		},
		topicsquery = apis.getQuery(topicsOptions);
		topicsquery.distinct = true;
		topicsquery.order = [['numberOfLikes', 'DESC']];
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
			models.organizationsInterests.findAll(topicsquery).then(function (data) {
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