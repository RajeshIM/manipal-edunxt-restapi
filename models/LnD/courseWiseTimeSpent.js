module.exports = (sequelize, DataTypes) => {
  var courseWiseTimeSpent = sequelize.define('muln_course_wise_timespent', {
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
        durationSpent: {
            type: DataTypes.DECIMAL(65,0),
            field: 'duration_spent'
        },
        courseDuration: {
          type: DataTypes.DECIMAL(65,0),
          field: 'course_duration'
        },
        timeSpentPercentage: {
          type: DataTypes.DECIMAL(64,2),
          field: 'time_spent_percentage'
        },
        expectedTimeSpentPercentage: {
          type: DataTypes.DECIMAL(64,2),
          field: 'expected_time_spent_percentage'
        },
        date: {
          type: DataTypes.DATEONLY,
          field: 'load_date'
        }
      });
  return courseWiseTimeSpent;
};