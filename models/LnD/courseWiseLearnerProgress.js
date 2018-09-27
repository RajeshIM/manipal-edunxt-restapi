module.exports = (sequelize, DataTypes) => {
    var courseWiseLearnerProgress = sequelize.define('muln_course_wise_learner_progress', {
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
          sectionId: {
            type: DataTypes.INTEGER(11),
            field: 'section_id'
          },
          courseName: {
              type: DataTypes.STRING(255),
              field: 'course_name'
          },
          programName: {
            type: DataTypes.STRING(255),
            field: 'program_name'
          },
          sectionName: {
            type: DataTypes.STRING(255),
            field: 'section_name'
          },
          actualProgress: {
            type: DataTypes.DECIMAL(65,2),
            field: 'progress',
            get: function() {
              var val = parseFloat(this.getDataValue('actualProgress') || 0).toFixed(2);
              return parseFloat(val);
            }
          },
          expectedProgress: {
            type: DataTypes.DECIMAL(9,2),
            field: 'expected_progress',
            get: function() {
              var val = parseFloat(this.getDataValue('expectedProgress') || 0).toFixed(2);
              return parseFloat(val);
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWiseLearnerProgress;
  };