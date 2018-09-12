module.exports = (sequelize, DataTypes) => {
    var courseWiseScoresDistribution = sequelize.define('muln_course_wise_scores', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          courseId: {
            type: DataTypes.INTEGER(11),
            field: 'course_id'
          },
          programId: {
            type: DataTypes.INTEGER(11),
            field: 'program_id'
          },
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          },
          questionPaperId: {
            type: DataTypes.INTEGER(11),
            field: 'questionpapertype_id'
          },
          filterName: {
            type: DataTypes.STRING(50),
            field: 'module_name'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          },
          personId: {
            type: DataTypes.INTEGER(11),
            field: 'person_id'
          },
          personName: {
            type: DataTypes.STRING(50),
            field: 'person_name'
          },
          learnerName: {
            type: DataTypes.STRING(50),
            field: 'learner_name'
          },
          serialNumber: {
            type: DataTypes.STRING(50),
            field: 'serial_no'
          },
          team :{
            type:DataTypes.STRING(50),
            field: 'team_name'
          },
          noOfAttempts: {
            type: DataTypes.DECIMAL(32,0),
            field: 'no_of_attempts',
            get: function() {
              return Math.round(this.getDataValue('noOfAttempts') || 0);
            }
          },
          Progress: {
            type: DataTypes.DECIMAL(13,2),
            field: 'progress',
            get: function() {
              return Math.round(this.getDataValue('Progress') || 0);
            }
          },
          scoreAvg: {
            type: DataTypes.DECIMAL(35,0),
            field: 'scores_avg',
            get: function() {
              return Math.round(this.getDataValue('scoreAvg') || 0);
            }
          },
          examsAttempted: {
            type: DataTypes.INTEGER(11),
            field: 'number_of_exams_attempted',
            get: function() {
              return Math.round(this.getDataValue('examsAttempted') || 0);
            }
          },
          totalExamsCount: {
            type: DataTypes.INTEGER(11),
            field: 'total_exams_count',
            get: function() {
              return Math.round(this.getDataValue('totalExamsCount') || 0);
            }
          }
        });
    return courseWiseScoresDistribution;
  };