var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	async = require('async');

exports.filters = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		types = req.query.type ? req.query.type.split(',') : '',
		scoresTable = 'courseWiseScoresDistribution',
		contentTypeTable = 'contentConsumption',
		batchAttributes = [['batch_id', 'id'],['batch_name','name']],
		scoreAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('module_name')), 'filterName'],'questionPaperId'],
		contentTypeAttributes = [[models[tenant].fn('DISTINCT',models[tenant].col('content_type')), 'id'],['content_type','name']],
		batchOptions = {
			req: req,
			attributes: batchAttributes,
			group: ['id', 'name']
		},
		scoresOptions = {
			req: req,
			attributes: scoreAttributes
		},
		contentTypeOptions = {
			req: req,
			attributes: contentTypeAttributes
		},
		batchQuery = apis.getQuery(batchOptions),
		scoresQuery = apis.getQuery(scoresOptions),
		contentTypeQuery = apis.getQuery(contentTypeOptions),
		isBatch = false,
		isQuiz = false,
		isAssignment = false,
		isContentType = false,
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
				case 'CONTENTTYPE'  : isContentType = true;
							   break;
			}
		})
	} 

	async.parallel({
		batches: function(next) {
			if(isBatch){
				models[tenant+'_'+scoresTable].findAll(batchQuery).then(function (data) {
					next(null, data);
				}).catch(function (err) {
					next(err);
				});
			}else{
				next(null, []);
			}
		},
		scores: function(next) {
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
		contentType: function(next) {
			if(isContentType){
				models[tenant+'_'+contentTypeTable].findAll(contentTypeQuery).then(function (data) {
					next(null, data);
				}).catch(function (err) {
					next(err);
				});
			}else{
				next(null, []);
			}
		}
	},function(err, result) {
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			var batches = result.batches,
				quizes = result.scores.quizes,
				assignments = result.scores.assignments,
				contentType = result.contentType;

			if(isBatch && batches.length > 0) responseData.push({type: 'batch',data: batches});
			if(isQuiz && quizes.length > 0) responseData.push({type: 'quiz',data: quizes});
			if(isAssignment && assignments.length > 0) responseData.push({type: 'assignment',data: assignments});
			if(isContentType && contentType.length > 0) responseData.push({type: 'contentType',data: contentType});

			response.sendSuccessResponse(res, responseData);
		}
	});
}