module.exports = (sequelize, DataTypes) => {
    var courseWiseLearnerPerformance = sequelize.define('muln_course_wise_learner_performance', {
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
          course: {
              type: DataTypes.STRING(500),
              field: 'course_name'
          },
          programName: {
            type: DataTypes.STRING(500),
            field: 'program_name'
          },
          performance: {
            type: DataTypes.DECIMAL(65,2),
            get: function() {
              return parseFloat(this.getDataValue('performance'));
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWiseLearnerPerformance;
  };