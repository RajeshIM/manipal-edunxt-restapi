module.exports = (sequelize, DataTypes) => {
  var learnerTrackDetails = sequelize.define('muln_learner_track_details', {
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
        learnerPerformanceType:{
          type: DataTypes.STRING(30)
        },
        actionMessage: {
          type: DataTypes.STRING(20)
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
  return learnerTrackDetails;
};