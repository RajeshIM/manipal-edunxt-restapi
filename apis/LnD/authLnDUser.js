var response = require('./../../helpers/response'),
    jwt = require('jsonwebtoken'),
    md5 = require('md5'),
    staticLoginDetails = require('../../config/static-login.json'),
    moment = require('moment');


exports.authLnDUser = function (req, res) {
    var authData = req.headers['a'];
    if (staticLoginDetails.data.hasOwnProperty(authData)) {
        var userData = staticLoginDetails.data[authData];
        userData.iat = moment().unix();
        userData.exp = moment().add(60, 'minute').unix();
        var token = jwt.sign(userData, 'qwertyuiopasdfghjklzxcvbnm123456');
        response.sendSuccessResponse(res, token);
    } else {
        response.customErrorMessage(res, "Invaild login details.");
    }
}