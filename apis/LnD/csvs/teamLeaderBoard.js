var response = require('./../../../helpers/response'),
	apis = require('./../../../helpers/apis'),
	json2csv = require('json2csv');

exports.teamLeaderBoard = function (req, res) {
	var fields = ['completion', 'completedProgram', 'teamSize', 'teamName'],
		csvData = [];

	apis.getTeamLeaderBoard(req, function(err, data){
		if(err){
			response.customErrorMessage(res, err.message);
		}else{
			if(data.length > 0){
				csvData = json2csv({data: data, fields: fields});
			}else{
				csvData = json2csv({fields: fields});
			}
			response.sendCSV(res, csvData, 'teamLeaderBoard');
		}
	});
}
