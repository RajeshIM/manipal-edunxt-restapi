module.exports = (sequelize, DataTypes) => {
    var enrolledSections = sequelize.define('muln_enrolled_sections', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          programId: {
            type: DataTypes.INTEGER(11),
            field: 'program_id'
          },
          programName: {
            type: DataTypes.STRING(255),
            field: 'program_name'
          },
          courseId: {
            type: DataTypes.INTEGER(11),
            field: 'course_id'
          },
          courseName: {
            type: DataTypes.STRING(255),
            field: 'course_name'
          },
          batch: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          },
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          },
          sectionId: {
            type: DataTypes.INTEGER(11),
            field: 'courseinstance_id'
          },
          name: {
            type: DataTypes.STRING(255),
            field: 'courseinstance_name'
          },
          startDate: {
            type: DataTypes.DATE,
            field: 'start_date'
          },
          date: {
            type: DataTypes.DATE,
            field: 'end_date'
          }
        });
    return enrolledSections;
  };