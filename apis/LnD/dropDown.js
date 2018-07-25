var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.dropDown = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		types = req.query.type ? req.query.type.split(',') : '',
		batchTable = 'enrolledBatches',
		scoresTable = 'courseWiseScoresDistribution',
		batchAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('batch_id')), 'id'],'name'],
		filterAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('module_name')), 'filterName'],'questionPaperId'],
		batchOptions = {
			req: req,
			attributes: batchAttributes
		},
		scoresOptions = {
			req: req,
			attributes: filterAttributes
		},
		batchQuery = apis.getQuery(batchOptions),
		scoresQuery = apis.getQuery(scoresOptions),
		isBatch = false,
		isQuiz = false,
		isAssignment = false,
		responseData = [];

	if (types.length > 0) {
		_.each(types, function(type) {
			switch(type.toUpperCase()) {
				case 'BATCH' : isBatch = true;
							   break;
				case 'QUIZ'  : isQuiz = true;
							   break;
			    case 'ASSIGNMENT'  : isAssignment = true;
							   break;
			}
		})
	} 

	async.parallel({
		batches: function(next) {
			if(isBatch){
				models[tenant+'_'+batchTable].findAll(batchQuery).then(function (data) {
					next(null, data);
				}).catch(function (err) {
					next(err);
				});
			}else{
				next(null, []);
			}
		},
		filters: function(next) {
			if(isQuiz || isAssignment) {
				models[tenant+'_'+scoresTable].findAll(scoresQuery).then(function (data) {
					var quizes = [],
						assignments = [];

					_.each(data, function(obj) {
						if(obj.questionPaperId === 5 && obj.filterName) {
							quizes.push({id:obj.filterName, name:obj.filterName})
						}else if(obj.questionPaperId === 5 && obj.filterName){
							assignments.push({id:obj.filterName, name:obj.filterName})
						}
					})

					next(null, {quizes:quizes, assignments:assignments});
				}).catch(function (err) {
					next(err);
				});
			}else{
				next(null, {
					quizes:[],
					assignments: []
				})
			}
		},
	},function(err, result) {
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			var batches = result.batches,
				quizes = result.filters.quizes,
				assignments = result.filters.assignments;

			if(isBatch) responseData.push({type: 'batch',data: batches});
			if(isQuiz) responseData.push({type: 'quiz',data: quizes});
			if(isAssignment) responseData.push({type: 'assignment',data: assignments});

			response.sendSuccessResponse(res, responseData);
		}
	});
}