module.exports = (sequelize, DataTypes) => {
    var enrolledPrograms = sequelize.define('muln_im_enrolled_programs', {
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
          name: {
            type: DataTypes.STRING(255),
            field: 'program_name'
          }
        });
    return enrolledPrograms;
  };