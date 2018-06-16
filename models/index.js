var Sequelize = require('sequelize'),
    env       = process.env.NODE_ENV || 'development',
    config    = require('../config/config.json')[env];
    db        = {};

var LnDSchemas = ['learningActivities',
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
    },
    timezone : "+05:30"
  };

var sequelize = new Sequelize(config.database, config.username, config.password, options);
  
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

LnDSchemas.forEach(function (schema) {
  db[schema] = sequelize.import(__dirname + '/LnD/' + schema);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
