module.exports = (sequelize, DataTypes) => {
  var learningActivities = sequelize.define('learning_activities', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true,
          field: 'LnDUserId'
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'CourseId'
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
        usersCompletedTranning: {
          type: DataTypes.INTEGER
        },
        usersCompletedTranningSinceLastMonth: {
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
          type: DataTypes.INTEGER
        },
        trainerRatingBy: {
          type: DataTypes.INTEGER
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
        jobId: {
          type: DataTypes.STRING(30)
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
        tableName: 'learning_activities'
      });
  // Orders.associate = function(models) {

  //   Orders.Persons = Orders.belongsTo(models.Persons, {as:'PersonsData', foreignKey: 'PersonID'});
  //   Orders.Users = Orders.belongsTo(models.User, {as:'userData', foreignKey: 'UserID'});
  // };
  return learningActivities;
};