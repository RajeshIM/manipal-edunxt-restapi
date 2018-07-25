module.exports = (sequelize, DataTypes) => {
    var enrolledBatches = sequelize.define('muln_im_batch_wise_enrolled_persons', {
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
          name: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          }
        });
    return enrolledBatches;
  };