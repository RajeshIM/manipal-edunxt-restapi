var response = require('./../../../helpers/response'),
	apis = require('./../../../helpers/apis'),
	base64 = require('js-base64').Base64,
	json2csv = require('json2csv');

exports.scoresDistributionDetails = function (req, res) {
	var type = '',
		fileName = 'testScores',
		filters = {},
		headers = {}, 
		fields = ['learnerName', 'serialNumber', 'team', 'batchName', 'scoreAvg', 'totalAttempts', 'examsAttempted', 'totalExams'],
		csvData = [];

	filters.query = req.query.q ? JSON.parse(base64.decode(req.query.q)) : {};
	filters.body = req.query.b ? JSON.parse(base64.decode(req.query.b)) : [];
	headers['tenant_name'] = req.query['tenant_name'];
	headers['user_id'] = req.query['user_id'];
	headers['user_type'] = req.query['user_type'];
	filters.headers = headers;

	type = filters.query.type ? filters.query.type.toUpperCase() : '';
	
	if(type === 'QUIZ'){
		fileName = 'quiz';
	}else if(type === 'ASSIGNMENT'){
		fileName = 'assignment';
	}

	apis.getScoresDistributionDetails(filters, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			if(data.length > 0){
				csvData = json2csv({data: data, fields: fields});
			}else{
				csvData = json2csv({fields: fields});
			}
			response.sendCSV(res, csvData, fileName);
		}
	});
}
