module.exports = (sequelize, DataTypes) => {
    var allCoursesMonthlyLearnerEngagement = sequelize.define('muln_all_courses_monthly_learner_engagement', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          monthlyCompleted: {
              type: DataTypes.DECIMAL(46,2),
              field: 'monthly_completed'
          },
          date: {
            type: DataTypes.STRING(20),
            field: 'load_date'
          }
        });
    return allCoursesMonthlyLearnerEngagement;
  };