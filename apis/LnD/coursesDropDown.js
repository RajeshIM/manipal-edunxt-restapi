var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis');

exports.coursesDropDown = function (req, res) {	
	var LnDUserId = req.headers['lnduserid'] ? parseInt([req.headers['lnduserid']]) : null,
		orgHeadId = req.headers['orgheadid'] ? parseInt([req.headers['orgheadid']]) : null,
		filters = '';

	filters = LnDUserId ? 'LnDUserId='+LnDUserId : '';
   	filters = (filters.length > 0 && orgHeadId) ? (filters + ' AND ' + 'orgHeadId='+orgHeadId) : 
   				(orgHeadId ? 'orgHeadId='+orgHeadId : filters);
   	filters = (filters.length > 0) ? (' where ' + filters) : '';

	var query = 'select distinct courseId,courseName from muln_Im_LNDUser_Course';
	query = query + filters;
	
	models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}