module.exports = (sequelize, DataTypes) => {
    var courseWisePersonsTrained = sequelize.define('muln_course_wise_persons_trained', {
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
          totalLearners: {
              type: DataTypes.BIGINT(21),
              field: 'total_learners'
          },
          completedTraining: {
            type: DataTypes.BIGINT(21),
            field: 'completed_training'
          },
          trainedPercentage: {
            type: DataTypes.DECIMAL(26,2),
            field: 'trained_percentage'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWisePersonsTrained;
  };