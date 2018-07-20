module.exports = (sequelize, DataTypes) => {
    var allCoursesEnrolledPersons = sequelize.define('muln_all_courses_daily_enrolled_pesons_count', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
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
    return allCoursesEnrolledPersons;
  };