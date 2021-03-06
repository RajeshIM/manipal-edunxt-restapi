var Sequelize = require('sequelize'),
    env       = process.env.NODE_ENV || 'development',
    config    = require('../config/config.json')[env],
    db        = {};

var userSchemas = ['activeUsersCount',
                  'activeUsers',
                  'dailyActiveUsers',
                  'monthlyActiveUsers',
                  'allCoursesEnrolledPersons',
                  'courseWiseEnrolledPersons',
                  'allCoursesMonthlyEnrolledPersons',
                  'courseWiseMonthlyEnrolledPersons',
                  'allCoursesLearnerEngagement',
                  'courseWiseLearnerEngagement',
                  'allCoursesMonthlyLearnerEngagement',
                  'courseWiseMonthlyLearnerEngagement',
                  'allCoursesLearnerPace',
                  'courseWiseLearnerPace',
                  'allCoursesTimeSpent',
                  'courseWiseTimeSpent',
                  'allCoursesPersonsTrained',
                  'courseWisePersonsTrained',
                  'courseWiseLearnerPerformance',
                  'courseWiseLearnerProgress',
                  'learnerPaceAndPerformanceDetails',
                  'allCoursesScores',
                  'courseWiseScoresDistribution',
                  'contentConsumption',
                  'teamWiseOrganizationPerformance',
                  'trainerWiseOrganizationPerformance',
                  'enrolledPrograms',
                  'enrolledCourses',
                  'enrolledBatches',
                  'enrolledSections',
                  'locationWiseDailyActiveUsers',
                  'person'
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
    pool: {
      max: 5,
      min: 0,
      acquire: 300000,
      idle: 10000
    }
  };
  databases = config.databases,
  connections = {};

  for (var key in databases) {
    connections[key] = new Sequelize(databases[key], config.username, config.password, options);
  }

  async function connectionsStatus() {
    for (var key in connections) {
      await connections[key].authenticate().then(() => {
        console.log('Connection has been established successfully to ', key);
      }).catch(err => {
        console.error('Unable to connect to the database:', err);
      })
    }
  }

  connectionsStatus();

  for (var key in connections) {
    db[key] = connections[key];
    userSchemas.forEach(function (schema) {
      db[key+'_'+schema] =  connections[key]['import'](__dirname + '/LnD/' + schema);
    });
  }
  
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
