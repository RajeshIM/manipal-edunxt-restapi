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
      currentDate: moment().format(__('YMD')),
      currentHour: moment().format('YYYY-MM-DD HH:mm:ss')
      //datTimestamps: [],
      //dayDates: [],
      //hourTimestamps: [],
      //hours: []
    },
    hrs = 23;

  if (startDate && endDate) {
    date.start = addLeadingZero(startDate);
    date.end = addLeadingZero(endDate);
    if (date.start === date.currentDate || date.end === date.currentDate) date.current = true;
  } else {
    date.current = true;
    date.start = moment(date.currentDate, __('YMD')).subtract(30, 'days').format(__('YMD'));
    date.end = moment(date.currentDate, __('YMD')).format(__('YMD'));
  }
  if (addOneDay) date.end = moment(date.end, __('YMD')).add(1, 'days').format(__('YMD'));
  date.days = moment(date.end, __('YMD')).diff(moment(date.start, __('YMD')), 'days');
  //if (!addOneDay) date.days += 1;

  // for (var i = 0; i <= date.days; i++) {
  //   var time = moment.utc(date.start, __('L'), true).add(i, 'days').format(__('x'));
  //   var dateSrt = moment.utc(date.start, __('L'), true).add(i, 'days').format(__('YMD'));
  //   var dat = moment.utc(date.start, __('L'), true).add(i, 'days').format(__('L'));
  //   var currentDate = moment.utc().format(__('L'));
  //   if (dat === currentDate) {
  //     hrs = moment.utc().hours();
  //   } 

  //   date.datTimestamps.push(parseInt(time));
  //   date.dayDates.push(dateSrt);
  // }

  // if (date.days == 0) {
  //   var time = moment.utc(date.end, __('L'), true).add(i, 'days').format(__('x'));
  //   var dateSrt = moment.utc(date.end, __('L'), true).add(i, 'days').format(__('YMD'));
  //   var dat = moment.utc(date.end, __('L'), true).add(i, 'days').format(__('L'));

  //   if (date.current) {
  //      hrs = moment.utc().hours();
  //    } else {
  //     hrs =24;
  //    }
  //   for (var j = 0; j < hrs; j++) {
  //     var hour = moment.utc(time, __('x'), true).add(j, 'hour').format(__('x'));
  //     var hourDate = moment.utc(date.end, __('L'), true).add(i, 'hour').format(__('YMD'));
  //     date.hourTimestamps.push(parseInt(hour));
  //     date.hours.push(parseInt(hour));
  //   }
  // }

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