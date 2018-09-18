var response = require('./../../../helpers/response'),
	apis = require('./../../../helpers/apis'),
	base64 = require('js-base64').Base64,
	json2csv = require('json2csv');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var filters = {},
		headers = {},
		type = '',
		displayFor = null,
		fn = '',
		fileName = '',
		paceFields = [],
		performanceFields = [],
	    fields = [],
		csvData = [];

	filters.query = req.query.q ? JSON.parse(base64.decode(req.query.q)) : {};
	filters.body = req.query.b ? JSON.parse(base64.decode(req.query.b)) : [];
	headers['tenant_name'] = req.query['tenant_name'];
	headers['user_id'] = req.query['user_id'];
	headers['user_type'] = req.query['user_type'];
	filters.headers = headers;

	type = filters.query.type ? filters.query.type.toUpperCase() : '';
	fn = (type==='PERFORMANCE') ? 'getLearnerPerformanceData': 'getLearnerPaceData';
	paceFields = ['learnerName', 'serialNumber', 'courseName', 'sectionName', 'batchName'
		 		  'examAccessed', 'examPassed', 'progress'];
	performanceFields = ['learnerName', 'serialNumber', 'courseName', 'sectionName', 'batchName',
				  			 'scoreInCourse', 'scoreAvg'];
	fields = (type==='PERFORMANCE') ? performanceFields: paceFields;
	displayFor = filters.query.displayFor ? filters.query.displayFor.replace('%20', ' ').replace('%20', ' '): null,
	fileName = filters.query.type ? (displayFor ? filters.query.type + '_'+ displayFor : filters.query.type) : 'pace';

	apis[fn](filters, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			if(data.length > 0){
				csvData = json2csv({data: data, fields: fields});
			}else{
				csvData = json2csv({fields: fields});
			}
			response.sendCSV(res, csvData, 'learnersOnTrack');
		}
	});
}
