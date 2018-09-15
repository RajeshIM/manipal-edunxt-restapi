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
              field: 'faculty_count',
              get: function() {
                var val = parseInt(this.getDataValue('facultyCount') || 0);
                return parseFloat(val).toFixed(0);
              }
          },
          learnerCount: {
            type: DataTypes.BIGINT(21),
            field: 'learner_count',
            get: function() {
                var val = parseInt(this.getDataValue('learnerCount') || 0);
                return parseFloat(val).toFixed(0);
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return locationWiseDailyActiveUsers;
};