module.exports = (sequelize, DataTypes) => {
    var allCoursesMonthlyEnrolledPersons = sequelize.define('muln_all_courses_monthly_enrolled_persons_count', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          monthlyEnrolledUsers: {
              type: DataTypes.DECIMAL(21,0),
              field: 'monthly_enrolled_users_count'
          },
          date: {
            type: DataTypes.STRING(69),
            field: 'load_date'
          }
        });
    return allCoursesMonthlyEnrolledPersons;
  };