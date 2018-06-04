module.exports = (sequelize, DataTypes) => {
  var daywiseLearnerTrackDetails = sequelize.define('muln_Day_Wise_Learner_Track_Details', {
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
        learnerId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        learnerName: {
          type: DataTypes.STRING(30)
        },
        serialNumber: {
          type: DataTypes.STRING(20)
        },
        teamId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        teamName: {
          type: DataTypes.STRING(30)
        },
        teamLeaderId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        teamLeaderName: {
          type: DataTypes.STRING(30)
        },
        scoreInCourse: {
          type: DataTypes.INTEGER
        },
        scoreAvg: {
          type: DataTypes.INTEGER
        },
        highestScore: {
          type: DataTypes.INTEGER
        },  
        learnerPaceType: {
          type: DataTypes.STRING(30)
        },
        learnerPerformanceType: {
          type: DataTypes.STRING(30)
        },
        actionMessage: {
          type: DataTypes.STRING(20)
        },
        day: {
          type: DataTypes.DATE,
          primaryKey: true
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
        tableName: 'muln_Day_Wise_Learner_Track_Details'
      });
  return daywiseLearnerTrackDetails;
};