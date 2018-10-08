var response = require('./../../helpers/response');

exports.getReportGeneratedTime = function (req, res) {	
	var tenant = req.headers['tenant_name'] ? req.headers['tenant_name'] : 'MAIT',
		report = req.query.report || '',
		userId = parseInt(req.headers['user_id'] || 0),
		userType = req.headers['user_type'],
		courseId =  parseInt(req.query.courseId || 0),
		filters = '',
		table = '',
		query = '',
		responseData = {};

	if (userId) {
		filters = ' where user_id='+userId;	
	}
	if(userType){
		filters = filters.length > 0 ? filters + ` and  user_type = '${userType}'` : ` where user_type = '${userType}'`;
	}

	switch(report.toUpperCase()){
		case 'LEARNERPACE': table = ' muln_daily_learner_track_details';
							  break;
		case 'LEARNERPERFORMANCE': table = ' muln_daily_learner_track_details';
							   break;
		case 'PERFORMANCE': table = ' ';
						    break;
		case 'PROGRESS':table = ' ';
						break;
		case 'SCORES': table = courseId ? 'muln_course_wise_scores': 'muln_all_courses_scores';
							  break;
		case 'LEARNERS': table = ' muln_daily_lerner_organization_performance';
							   break;
		case 'TRAINERS': table = ' muln_daily_trainer_organization_performance';
						    break;
		case 'TEAMS':table = ' muln_daily_team_organization_performance';
						break;
		case 'CONTENTCONSUMPTION': table = ' muln_content_consumption';
						           break;
		case 'ORGANIZATIONINTERESTS':table = ' muln_organization_interests';
						             break;
	}
	if(report.toUpperCase() === 'TEAMS'){
		query = ` SELECT MAX(load_date) as updatedDate from `+ table + filters;
	}else{
		query = ` SELECT MAX(updated_date) as updatedDate from `+ table + filters;
	}

	models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		if(data.length > 0 && data[0].updatedDate) responseData.reportGeneratedTime = data[0].updatedDate;
	    response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}