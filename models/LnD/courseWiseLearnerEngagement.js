module.exports = (sequelize, DataTypes) => {
    var courseWiseLearnerEngagement = sequelize.define('muln_course_wise_daily_learner_engagement', {
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
          completed: {
              type: DataTypes.DECIMAL(21,2)
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWiseLearnerEngagement;
  };