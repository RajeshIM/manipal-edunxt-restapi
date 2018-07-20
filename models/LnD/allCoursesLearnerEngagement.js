module.exports = (sequelize, DataTypes) => {
    var allCoursesLearnerEngagement = sequelize.define('muln_all_courses_daily_learner_engagement', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          completed: {
              type: DataTypes.DECIMAL(21,2)
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return allCoursesLearnerEngagement;
  };