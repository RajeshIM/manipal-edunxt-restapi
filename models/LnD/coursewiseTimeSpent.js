module.exports = (sequelize, DataTypes) => {
  var coursewiseTimeSpent = sequelize.define('muln_LNDUser_Course_Wise_TimeSpent', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        courseStartdate: {
          type: DataTypes.DATE
        },
        courseEnddate: {
          type: DataTypes.DATE
        },
        durationSpent: {
          type: DataTypes.INTEGER
        },
        courseDuration: {
          type: DataTypes.INTEGER
        },
        durationNeedToSpent: {
          type: DataTypes.INTEGER
        },
        timeSpentPercentage: {
          type: DataTypes.DOUBLE
        },
        expectedTimeSpentPercentage: {
          type: DataTypes.DOUBLE
        },
        usersTrained: {
          type: DataTypes.INTEGER
        },
        usersCompletedTraining: {
          type: DataTypes.INTEGER
        },
        usersCompletedTrainingPercentage: {
          type: DataTypes.DOUBLE
        },
        usersCompletedTrainingExpectedPercentage: {
          type: DataTypes.DOUBLE
        },
        date: {
          type: DataTypes.DATE,
          primaryKey: true
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
      });
  return coursewiseTimeSpent;
};