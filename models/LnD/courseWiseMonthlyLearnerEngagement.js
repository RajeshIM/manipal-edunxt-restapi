module.exports = (sequelize, DataTypes) => {
    var courseWiseMonthlyLearnerEngagement = sequelize.define('muln_course_wise_monthly_learner_engagement', {
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
          monthlyCompleted: {
              type: DataTypes.BIGINT(21,0),
              field: 'monthly_completed'
          },
          date: {
            type: DataTypes.STRING(69),
            field: 'load_date'
          }
        });
    return courseWiseMonthlyLearnerEngagement;
  };