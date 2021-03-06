module.exports = (sequelize, DataTypes) => {
    var enrolledBatches = sequelize.define('muln_im_enrolled_batches', {
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
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          name: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          }
        });
    return enrolledBatches;
  };