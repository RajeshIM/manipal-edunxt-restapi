var response = require('./../../../helpers/response'),
  base64 = require('js-base64').Base64;

exports.fileUrl = function (req, res) {
  var body = req.body,
    query = req.query,
    requestUrl = req.protocol + '://' + req.get('host'),
    requestPath = '/api/v1/lnd' + req.path,
    url = requestUrl + requestPath,
    requestQuery = '?tenant_name=' + req.headers['tenant_name'] + '&user_id=' + req.headers['user_id'] + 
                    '&user_type=' + req.headers['user_type'];

  if (!_.isEmpty(body)) {
   body = JSON.stringify(body);
   body = base64.encode(body);
   requestQuery += '&b=' + body;
  }

  if (!_.isEmpty(query)) {
    query = JSON.stringify(query);
    query = base64.encode(query);
    requestQuery += '&q=' + query;
  }

  url = url + requestQuery;

  response.sendSuccessResponse(res, url);
};
