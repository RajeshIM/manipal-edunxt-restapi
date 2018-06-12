var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.organizationInterests = function (req, res) {
	var interestsFields = ['courseId', 'courseName', 'hits', 'hitsSinceLastMonth'],
		intAggFields = ['hits:SUM', 'hitsSinceLastMonth:SUM'],
		intAggData = apis.getAttributes(intAggFields),
		interestsAttributes = _.union(interestsFields, intAggData),
		intGroup = ['courseId'],
		interestsOptions = {
			req: req,
			group: intGroup,
			//endDate: true,
			attributes: interestsAttributes
		},
		sequelize = models.sequelize;
		interestsquery = apis.getQuery(interestsOptions);
		interestsquery.order = [[sequelize.fn('SUM', sequelize.col('hits')), 'DESC']];
		interestsquery.limit = 3;

	var topicsFields = ['courseId', 'courseName'],
		topicsAggFields = ['numberOfLikes:SUM'],
		topicsAggData = apis.getAttributes(topicsAggFields),
		topicsAttributes = _.union(topicsFields, topicsAggData),
		topicsGroup = ['courseId'],
		topicsOptions = {
			req: req,
			group: topicsGroup,
			//endDate: true,
			attributes: topicsAttributes
		},
		topicsquery = apis.getQuery(topicsOptions);
		topicsquery.distinct = true;
		topicsquery.order = [[sequelize.fn('SUM', sequelize.col('numberOfLikes')), 'DESC']];
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