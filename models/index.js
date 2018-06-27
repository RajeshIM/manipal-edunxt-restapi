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

var sequelize = new Sequelize(config.database, config.username, config.password, options);
var sequelize_test = new Sequelize(config.testdb, config.username, config.password, options);
  
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully to ', config.database);
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize_test.authenticate().then(() => {
    console.log('Connection has been established successfully to ', config.testdb);
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

userSchemas.forEach(function (schema) {
  db[schema] = sequelize_test.import(__dirname + '/LnD/' + schema);
});

LnDSchemas.forEach(function (schema) {
  db[schema] = sequelize.import(__dirname + '/LnD/' + schema);
});

db.sequelize = sequelize;
db.sequelize_test = sequelize_test;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
