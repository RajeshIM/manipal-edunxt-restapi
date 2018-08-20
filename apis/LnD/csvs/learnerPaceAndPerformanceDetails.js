var response = require('./../../../helpers/response'),
	apis = require('./../../../helpers/apis'),
	json2csv = require('json2csv');

exports.learnerPaceAndPerformanceDetails = function (req, res) {
	var fields = ['learnerName', 'serialNumber', 'courseName', 'programName', 'teamName', 'batchName',
				  'scoreInCourse', 'scoreAvg', 'highestScore', 'paceType', 'performanceType', 'date'],
		csvData = [];

	apis.getlearnerPaceAndPerformanceData(req, function(err, data){
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
