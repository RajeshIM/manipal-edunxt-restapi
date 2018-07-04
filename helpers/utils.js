var moment = require('moment')

/** Function to parseDate
 *
 * @param {Object} req The request  object
 * @param {Boolean} addOneDay The optional parameter to add one day to end date
 * @return {Object} Returns the object which contains start date and end date
 */
exports.getDates = function (req, addOneDay) {
  var startDate = req.query.start_date,
    endDate = req.query.end_date,
    date = {
      current: false,
      currentStatus: false,
      currentDate: moment().format(__('YMD')),
      currentHour: moment().format('YYYY-MM-DD HH:mm:ss')
    };

  if (startDate && endDate) {
    date.start = addLeadingZero(startDate);
    date.end = addLeadingZero(endDate);
    if (date.start === date.currentDate || date.end === date.currentDate) date.current = true;
    if (date.start === date.currentDate && date.end === date.currentDate) date.currentStatus = true;
  } else {
    date.current = true;
    date.start = moment(date.currentDate, __('YMD')).subtract(90, 'days').format(__('YMD'));
    date.end = moment(date.currentDate, __('YMD')).format(__('YMD'));
  }
  if (addOneDay) date.end = moment(date.end, __('YMD')).add(1, 'days').format(__('YMD'));
  date.days = moment(date.end, __('YMD')).diff(moment(date.start, __('YMD')), 'days');

  return date;
};

/** Function to format the date
 *
 * @param {String} date
 * @param {Boolean} withDash
 * @return {String} Returns the formatted date
 */
function addLeadingZero (date, withDash) {
  date = withDash ? date.split('-') : date.split('/');

  var day = parseInt(date[0]) <= 9 ? ('0' + parseInt(date[0].toString())) : date[0],
    month = parseInt(date[1]) <= 9 ? ('0' + parseInt(date[1].toString())) : date[1],
    year = parseInt(date[2]);
  return year + '-' + month + '-' + day;
}