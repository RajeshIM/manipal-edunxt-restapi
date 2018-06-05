module.exports = (sequelize, DataTypes) => {
  var learningActivities = sequelize.define('muln_learning_activities', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        totalActiveUsers: {
          type: DataTypes.INTEGER
        },
        activeUsersSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        enrolledUsers: {
          type: DataTypes.INTEGER
        },
        enrolledUsersSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        usersCompletedTraining: {
          type: DataTypes.INTEGER
        },
        usersCompletedTrainingSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        usersBehindSchedule: {
          type: DataTypes.INTEGER
        },
        usersAheadSchedule: {
          type: DataTypes.INTEGER
        },
        usersOnTrack: {
          type: DataTypes.INTEGER
        },
        usersHaveNotStarted: {
          type: DataTypes.INTEGER
        },
        trainerRating: {
          type: DataTypes.DOUBLE
        },
        trainerRatingBy: {
          type: DataTypes.DOUBLE
        },
        learnerSatisfaction: {
          type: DataTypes.DOUBLE
        },
        learnerSatisfactionBy: {
          type: DataTypes.DOUBLE
        },
        contentRating: {
          type: DataTypes.DOUBLE
        },
        contentRatingBy: {
          type: DataTypes.DOUBLE
        },
        date: {
          type: DataTypes.DATE
        },
        createdBy: {
          type: DataTypes.STRING(30)
        },
        createdOn: {
          type: DataTypes.DATE
        },
        modifiedBy: {
          type: DataTypes.STRING(30)
        },
        modifiedOn: {
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'muln_learning_activities'
      });
  // Orders.associate = function(models) {

  //   Orders.Persons = Orders.belongsTo(models.Persons, {as:'PersonsData', foreignKey: 'PersonID'});
  //   Orders.Users = Orders.belongsTo(models.User, {as:'userData', foreignKey: 'UserID'});
  // };
  return learningActivities;
};