module.exports = (sequelize, DataTypes) => {
    var allCoursesPersonsTrained = sequelize.define('muln_all_courses_persons_trained', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
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
    return allCoursesPersonsTrained;
  };