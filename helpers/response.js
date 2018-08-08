/**
 * Function to send success response
 *
 * @param {Object} res The response object
 * @param {Object} data The result of the API
 * @param {String} message
 */
exports.sendSuccessResponse = function (res, data, message, pagination) {
  message = message || '';
  var respData = {
    data: data,
    status: {
      type: "success",
      message: message
    },
    statusCode: 200
  };

  if (pagination) {
    respData.pagination = pagination;
  }
  
  res.status(200).send(respData);
};

/**
 * Function to send csv file in response
 *
 * @param {Object} res The response object
 * @param {Object} data The result of the API
 * @param {String} fileName The CSV file name
 */
exports.sendCSV = function (res, data, fileName) {
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName + '.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(data);
};

/**
 * Function to send custom error response
 *
 * @param {Object} res The response object
 * @param {String} message
 * @param {Integer} status The status code
 */
exports.customErrorMessage = function (res, message, status) {

  status = status ? status : 400;

  res.status(status).send({
    statusCode: status,
    status: {
      type: 'error',
      message: message
    }
  });
};