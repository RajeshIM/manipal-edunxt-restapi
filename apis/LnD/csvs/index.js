/** This file contains all the CSV APIs and exporting each file as a module */

var CSVs = [
  'contentConsumption',
  'learnerPaceAndPerformanceDetails',
  'scoresDistributionDetails',
  'teamLeaderBoard',
  'trainerLeaderBoard',
  'learnerLeaderBoard',
  'organizationInterestsDetails',
  'fileUrl',
  'activeUsersLineGraph',
  'modeOfDelivery',
  'activeUsersByLocation'
];

CSVs.forEach(function (csv) {
  // Exporting CSV APIs as a module
  module.exports[csv] = require(__dirname + '/' + csv)[csv];
});