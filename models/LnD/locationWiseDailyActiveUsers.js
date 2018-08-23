module.exports = (sequelize, DataTypes) => {
    var locationWiseDailyActiveUsers = sequelize.define('muln_location_wise_daily_active_learners_faculties', {
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
          location: {
            type: DataTypes.STRING(50),
            field: 'location'
          },
          facultyCount: {
              type: DataTypes.BIGINT(21),
              field: 'faculty_count'
          },
          learnerCount: {
            type: DataTypes.BIGINT(21),
            field: 'learner_count'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return locationWiseDailyActiveUsers;
};