module.exports = (sequelize, DataTypes) => {
  var trainerWiseOrganizationPerformance = sequelize.define('muln_trainer_organization_performance', {
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
        trainerId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        trainerName: {
          type: DataTypes.STRING(30)
        },
        trainingsConducted: {
          type: DataTypes.INTEGER
        },
        peopleTrained: {
          type: DataTypes.INTEGER
        },
        avgRating: {
          type: DataTypes.DOUBLE
        },
        actionMessage: {
          type: DataTypes.STRING(20)
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
        tableName: 'muln_trainer_organization_performance'
      });
  return trainerWiseOrganizationPerformance;
};