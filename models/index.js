var Sequelize = require('sequelize'),
    env       = process.env.NODE_ENV || 'development',
    config    = require('../config/config.json')[env];
    db        = {};

var userSchemas = [
                  'activeUsers',
                  'learningActivities',
                  'courseWiseLearningActivities',
                  'userwiseTimeSpent',
                  'coursewiseTimeSpent'
                ],
    LnDSchemas = ['daywiseActiveUsers',
                  'hourwiseActiveUsers',
                  'currentActiveUsers',
                  'userActivityByLocation',
                  'daywiseUserActivityByLocation',
                  'learnerTrackDetails',
                  'daywiseLearnerTrackDetails',
                  'learnerPerformanceAndProgress',
                  'learnerPerformanceAndProgressDetails',
                  'trainerWiseOrganizationPerformance',
                  'learnerWiseOrganizationPerformance',
                  'teamWiseOrganizationPerformance',
                  'contentConsumption',
                  'organizationsInterests',
                  'coursesDropDown'
                ],
  orgSchemas = ['programStatus'];

var options = {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false,
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false
    }
  };

var MAIT = new Sequelize(config.MAIT, config.username, config.password, options);
var MAB = new Sequelize(config.MAB, config.username, config.password, options);
  
  MAIT.authenticate().then(() => {
    console.log('Connection has been established successfully to ', config.MAIT);
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  MAB.authenticate().then(() => {
    console.log('Connection has been established successfully to ', config.MAB);
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// userSchemas.forEach(function (schema) {
//   db[schema] = sequelize_test.import(__dirname + '/LnD/' + schema);
// });

// LnDSchemas.forEach(function (schema) {
//   db['MAIT'][schema] = MAIT.import(__dirname + '/LnD/' + schema);
//   db['MAB'][schema] = MAIT.import(__dirname + '/LnD/' + schema);
// });

db.MAIT = MAIT;
db.MAB = MAB;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
