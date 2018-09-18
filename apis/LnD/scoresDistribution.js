var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils');

exports.scoresDistribution = function (req, res) {
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		courseId = parseInt(req.query.courseId || 0),
		batchId = req.body.batchId ? _.flatten([req.body.batchId]) : [],
		date = utils.getDates(req),
		filters = apis.getFiltersForRawQuery(req, false),
		table = courseId ? ' muln_course_wise_scores': ' muln_all_courses_scores',
		group = '',
		query = '';

	dateFilter = ` where load_date BETWEEN '${date.start}' AND '${date.end}'`;
	group = ' GROUP BY scoreRanges';
  
    query = `SELECT CASE WHEN progress BETWEEN 0 AND 20 THEN '0-20'
						 WHEN progress BETWEEN 21 AND 40 THEN '21-40'
						 WHEN progress BETWEEN 41 AND 60 THEN '41-60'
						 WHEN progress BETWEEN 61 AND 80 THEN '61-80'
						 WHEN progress BETWEEN 81 AND 100 THEN '81-100'
				END AS scoreRanges, COUNT(person_id) AS numberOfUsers
				FROM  (SELECT person_id, AVG(IFNULL(progress, 0)) AS progress FROM `+ table + dateFilter + filters + 
				` Group By 1)sub `+ group;
			
  	var result = [{
  		'scoreRanges': '0-20',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '21-40',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '41-60',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '61-80',
  		'numberOfUsers': 0
  	},
  	{
  		'scoreRanges': '81-100',
  		'numberOfUsers': 0
  	}];

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		if (data.length > 0) {
			for (var i in result) {
				var obj = _.findWhere(data, {scoreRanges: result[i].scoreRanges});
				if (!_.isEmpty(obj)) {
					result[i].scoreRanges = obj.scoreRanges.split('-');
					result[i].scoreRanges[0] = parseInt(result[i].scoreRanges[0]);
					result[i].scoreRanges[1] = parseInt(result[i].scoreRanges[1]);
					result[i].numberOfUsers = obj.numberOfUsers;
				} else {
					result[i].scoreRanges = result[i].scoreRanges.split('-');
					result[i].scoreRanges[0] = parseInt(result[i].scoreRanges[0]);
					result[i].scoreRanges[1] = parseInt(result[i].scoreRanges[1]);
				}
			}
		} else {
			result = [];
		}
	    response.sendSuccessResponse(res, result);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}