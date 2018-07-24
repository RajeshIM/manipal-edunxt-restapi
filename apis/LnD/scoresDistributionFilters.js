var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.scoresDistributionFilters = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		table = 'scoresDistributionFilters',
		batchAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('batch_id')), 'batchId'],'batchName'],
		filterAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('module_name')), 'filterName'],'questionPaperId'],
		batchOptions = {
			req: req,
			attributes: batchAttributes
		},
		filterOptions = {
			req: req,
			attributes: filterAttributes
		},
		batchQuery = apis.getQuery(batchOptions),
		filterQuery = apis.getQuery(filterOptions),
		responseData = {};

	async.parallel({
		batches: function(next) {
			models[tenant+'_'+table].findAll(batchQuery).then(function (data) {
				next(null, data);
			}).catch(function (err) {
				next(err);
			});
		},
		filters: function(next) {
			models[tenant+'_'+table].findAll(filterQuery).then(function (data) {
				var quizes = [],
					assignments = [];

				_.each(data, function(obj) {
					if(obj.questionPaperId === 5 && obj.filterName) {
						quizes.push(obj.filterName)
					}else if(obj.questionPaperId === 5 && obj.filterName){
						assignments.push(obj.filterName)
					}
				})
				next(null, {
					quizes:quizes,
					assignments:assignments
				});
			}).catch(function (err) {
				next(err);
			});
		},
	},function(err, result) {
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			responseData.batches = result.batches;
			responseData.quizes = result.filters.quizes;
			responseData.assignments = result.filters.assignments;
			response.sendSuccessResponse(res, responseData);
		}
	});
}