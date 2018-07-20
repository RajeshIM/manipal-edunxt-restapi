module.exports = (sequelize, DataTypes) => {
    var allCoursesTimeSpent = sequelize.define('muln_all_courses_timespent', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
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
    return allCoursesTimeSpent;
  };