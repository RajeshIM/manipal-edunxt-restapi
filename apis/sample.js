var response = require('../helpers/response'),
	apis = require('../helpers/apis'),
	moment = require('moment'),
	Op = require('Sequelize').Op;

exports.sample = function (req, res) {
	// var filters = apis.getFilters(req).filters,
	// 	attributes = ['id', 'name', 'date'],
	// 	query = apis.getQuery(filters, attributes);
	var date = moment.utc('2018-05-26', __('YMD')).format(__('YMD'));
	//var query = `select * from sample where date = '2018-05-28'`;
	var query = {
		where: {
			date: '2018-05-28'
		}
	}

	// models.sequelize.query(query,{type: models.sequelize.QueryTypes.SELECT}).then(function (data) {
	// 	// var date = moment.utc(data[0].date, __('YMD')).format(__('YMD'));
	// 	// console.log(date)
	//     response.sendSuccessResponse(res, data);
	// }).catch(function (err) {
	//     response.customErrorMessage(res, err.message);
	// });

	models.sample.findAll(query).then(function (data) {
		// var date = moment.utc(data[0].date, __('YMD')).format(__('YMD'));
		// console.log(date)
	    response.sendSuccessResponse(res, data);
	}).catch(function (err) {
	    response.customErrorMessage(res, err.message);
	});
}