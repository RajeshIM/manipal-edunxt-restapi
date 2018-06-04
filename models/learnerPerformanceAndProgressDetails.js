module.exports = (sequelize, DataTypes) => {
  var learnerPerformanceAndProgressDetails = sequelize.define('muln_learner_performance_and_progress_details', {
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
        courseStartDate: {
          type: DataTypes.DATE
        },
        courseEndDate: {
          type: DataTypes.DATE
        },
        studentCount: {
          type: DataTypes.INTEGER
        },
        programStatus: {
          type: DataTypes.STRING(30)
        },
        completionAvg: {
          type: DataTypes.DOUBLE
        },
        testScoreAvg: {
          type: DataTypes.INTEGER
        },
        higestScore: {
          type: DataTypes.INTEGER
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
        tableName: 'muln_learner_performance_and_progress_details'
      });

  return learnerPerformanceAndProgressDetails;
};