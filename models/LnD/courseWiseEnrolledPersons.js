module.exports = (sequelize, DataTypes) => {
    var courseWiseEnrolledPersons = sequelize.define('muln_courses_wise_daily_enrolled_pesons_count', {
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
          enrolledUsers: {
              type: DataTypes.DECIMAL(21,2),
              field: 'enrolled_users_count'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWiseEnrolledPersons;
  };