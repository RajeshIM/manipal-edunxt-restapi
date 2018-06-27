var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.activeUsers = function (req, res) {
	var imagesFields = ['fileLocation'],
		imagesQuery = {};
		imagesQuery.attributes = imagesFields;
		imagesQuery.order = [['login_time', 'DESC']];
		imagesQuery.limit = 5;
	var responseData = {
			activeUsers: 0,
			images: []
		};
	
	async.parallel({
		activeUsers: function (next) {
			models.activeUsers.aggregate('personId', 'count', { distinct: true }).then(function (count) {
			    next(null, count);
			}).catch(function (err) {
			    next(err);
			});
		},
		fileLocations: function (next) {
			models.activeUsers.findAll(imagesQuery).then(function (data) {
			    next(null, data);
			}).catch(function (err) {
			    next(err);
			});
		}
	}, function (err, results) {
		if (err) {
			response.customErrorMessage(res, err.message);
		} else {
			responseData.activeUsers = results.activeUsers;
			responseData.images = results.fileLocations;
			response.sendSuccessResponse(res, responseData);
		}
	});
}