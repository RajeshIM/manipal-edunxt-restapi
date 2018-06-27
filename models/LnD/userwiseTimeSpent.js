module.exports = (sequelize, DataTypes) => {
  var userwiseTimeSpent = sequelize.define('muln_user_wise_timespent', {
        domainId: {
          type: DataTypes.STRING(100),
          field: 'domain_id'
        },
        LnDUserId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'user_id'
        },
        userType: {
          type: DataTypes.STRING(3),
          field: 'user_type'
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
          field: 'load_date'
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
  return userwiseTimeSpent;
};