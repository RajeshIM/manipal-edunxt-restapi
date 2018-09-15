module.exports = (sequelize, DataTypes) => {
    var learnerPaceAndPerformanceDetails = sequelize.define('muln_daily_learner_track_details', {
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
          courseName: {
            type: DataTypes.STRING(50),
            field: 'course_name'
          },
          programId: {
            type: DataTypes.INTEGER(11),
            field: 'program_id'
          },
          programName: {
            type: DataTypes.STRING(50),
            field: 'program_name'
          },
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(50),
            field: 'batch_name'
          },
          teamId: {
            type: DataTypes.INTEGER(11),
            field: 'courseinstance_id'
          },
          teamName: {
            type: DataTypes.STRING(50),
            field: 'courseinstancename'
          },
          learnerId: {
            type: DataTypes.INTEGER(11),
            field: 'person_id'
          },
          learnerName: {
            type: DataTypes.STRING(50),
            field: 'person_name'
          },
          serialNumber: {
            type: DataTypes.STRING(50),
            field: 'rollno'
          },
          scoreInCourse: {
            type: DataTypes.INTEGER(11),
            field: 'score',
            get: function() {
                var val = parseInt(this.getDataValue('scoreInCourse') || 0);
                return val;
            }
          },
          highestScore: {
            type: DataTypes.INTEGER(11),
            field: 'higest_score',
            get: function() {
                var val = parseInt(this.getDataValue('highestScore') || 0);
                return val;
            }
          },
          scoreAvg: {
            type: DataTypes.DECIMAL(9,0),
            field: 'score_avg',
            get: function() {
                var val = parseFloat(this.getDataValue('scoreAvg') || 0).toFixed(0);
                return parseFloat(val).toFixed(2);
            }
          },
          scorePercentage: {
            type: DataTypes.DECIMAL(37,0),
            field: 'score_percentage',
            get: function() {
                var val = parseFloat(this.getDataValue('scorePercentage') || 0).toFixed(0);
                return parseFloat(val).toFixed(0);
            }
          },
          examAccessed: {
            type: DataTypes.DECIMAL(9,2),
            field: 'exam_accessed',
            get: function() {
                var val = parseInt(this.getDataValue('examAccessed') || 0);
                return val;
            }
          },
          examPassed: {
            type: DataTypes.DECIMAL(9,2),
            field: 'exam_passed',
            get: function() {
                var val = parseInt(this.getDataValue('examPassed') || 0);
                return val;
            }
          },
          paceType: {
            type: DataTypes.STRING(50),
            field: 'pacetype'
          },
          performanceType: {
            type: DataTypes.STRING(50),
            field: 'performance_type'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return learnerPaceAndPerformanceDetails;
  };