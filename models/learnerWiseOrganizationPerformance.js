module.exports = (sequelize, DataTypes) => {
  var learnerWiseOrganizationPerformance = sequelize.define('muln_learner_organization_performance', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        zoneId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        learnerId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        learnerName: {
          type: DataTypes.STRING(30)
        },
        learnerSerialNumber: {
          type: DataTypes.STRING(30)
        },
        pointsEarned: {
          type: DataTypes.INTEGER
        },
        pointsEarnedSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        testPerformance: {
          type: DataTypes.DOUBLE
        },
        avgTestPerformance: {
          type: DataTypes.DOUBLE
        },
        examScore: {
          type: DataTypes.INTEGER
        },
        actionMessage: {
          type: DataTypes.STRING(20)
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
        tableName: 'muln_learner_organization_performance'
      });
  return learnerWiseOrganizationPerformance;
};