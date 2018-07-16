var response = require('./../../helpers/response'),
	apis = require('./../../helpers/apis'),
	utils = require('./../../helpers/utils'),
	async = require('async'),
	moment = require('moment');

exports.usersTrained = function (req, res) {
	var tenant = req.headers['tenant-name'] ? req.headers['tenant-name'] : 'MAIT',
		date = utils.getDates(req),
		userId = req.headers['lnduserid'] ? parseInt(req.headers['lnduserid']) : null,
		userType  =  req.headers['usertype'] ? req.headers['usertype'] : null,
		courseId =  req.query.courseId ? parseInt(req.query.courseId) : null,
		programId =  req.query.programId ? parseInt(req.query.programId) : null,
		userIdFilter = '',
		courseIdFilter = '',
		userTypeFilter = '',
		programIdFilter = '',
		dateFilter = '',
		filters = '',
		table = courseId ? 'muln_course_wise_persons_trained': 'muln_all_courses_persons_trained',
		query = '',
		responseData = {
			trainedPercentage: 0,
			expectedtrainedPercentage: 0,
			completedTraining: 0,
			totalLearners: 0
		};

	if (userId) {
		userIdFilter = ` user_id = ${userId}`;
	}
	if (userType) {
		userTypeFilter = ` user_type = '${userType}'`;
	}
	if (courseId){
		courseIdFilter = ` course_id = ${courseId}`;
	}
	if (programId){
		programIdFilter = ` program_id = ${programId}`;
	}


   	filters = userId ? userIdFilter : '';
   	filters = (filters.length > 0 && courseId) ? (filters + ' AND' + courseIdFilter) : 
   				(courseId ? courseIdFilter : filters);
   	filters = (filters.length > 0 && programId) ? (filters + ' AND' + programIdFilter): 
   	   		(programId ? programIdFilter : filters);
   	filters = (filters.length > 0 && userType) ? (filters + ' AND' + userTypeFilter) : 
   	   		(userType ? userTypeFilter : filters);
   	filters = (filters.length > 0) ? (' AND ' + filters) : '';

 	query = 'select trained_percentage,completed_training,total_learners from '+ table + ` where load_date=date(now())`+ filters;
    
    models[tenant].query(query, {type: models[tenant].QueryTypes.SELECT}).then(function (data) {
		responseData.trainedPercentage = data.length>0 ? parseFloat(data[0].trained_percentage || 0) : 0;	
		responseData.expectedtrainedPercentage = 0;
		responseData.completedTraining = data.length>0 ? parseInt(data[0].completed_training || 0) : 0;
		responseData.totalLearners = data.length>0 ? parseInt(data[0].total_learners || 0) : 0;
		response.sendSuccessResponse(res, responseData);
	}).catch(function (err) {
		response.customErrorMessage(res, err.message);
	});

}