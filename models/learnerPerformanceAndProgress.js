module.exports = (sequelize, DataTypes) => {
  var learnerPerformanceAndProgress = sequelize.define('muln_learner_performance_and_progress', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        courseName: {
          type: DataTypes.STRING(30)
        },
        batchId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        batchName: {
          type: DataTypes.STRING(30)
        },
        zoneId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        zoneName: {
          type: DataTypes.STRING(30)
        },
        performance: {
          type: DataTypes.INTEGER
        },
        progress: {
          type: DataTypes.INTEGER
        },
        Date: {
          type: DataTypes.DATE
        },
        jobId: {
          type: DataTypes.INTEGER
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
        tableName: 'muln_learner_performance_and_progress'
      });

  return learnerPerformanceAndProgress;
};