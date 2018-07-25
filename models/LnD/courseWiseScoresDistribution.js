module.exports = (sequelize, DataTypes) => {
    var courseWiseScoresDistribution = sequelize.define('muln_course_wise_scores', {
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
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          },
          questionPaperId: {
            type: DataTypes.INTEGER(11),
            field: 'questionpapertype_id'
          },
          filterName: {
            type: DataTypes.STRING(255),
            field: 'module_name'
          }
        });
    return courseWiseScoresDistribution;
  };