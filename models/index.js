var Sequelize = require('sequelize'),
    env       = process.env.NODE_ENV || 'development',
    config    = require('../config/config.json')[env];
    db        = {};

var schemas = ['learningActivities',
              'topActiveUsers',
              'userwiseTimeSpent',
              'coursewiseTimeSpent',
              'daywiseActiveUsers',
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
              ];

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
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

schemas.forEach(function (schema) {
  db[schema] = sequelize.import(__dirname + '/' + schema);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

global.models = db;

module.exports = db;
