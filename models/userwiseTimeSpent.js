module.exports = (sequelize, DataTypes) => {
  var userwiseTimeSpent = sequelize.define('muln_LNDUser_Wise_TimeSpent', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
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
        usersCompleatedTrainingPercentage: {
          type: DataTypes.DOUBLE
        },
        usersCompleatedTrainingExpectedPercentage: {
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
      },
      {
        tableName: 'muln_LNDUser_Wise_TimeSpent'
      });
  return userwiseTimeSpent;
};