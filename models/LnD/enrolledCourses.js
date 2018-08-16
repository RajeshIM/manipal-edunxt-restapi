module.exports = (sequelize, DataTypes) => {
    var enrolledCourses = sequelize.define('muln_im_enrolled_courses', {
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
          name: {
            type: DataTypes.STRING(255),
            field: 'course_name'
          }
        });
    return enrolledCourses;
  };