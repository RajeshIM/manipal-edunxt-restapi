module.exports = (sequelize, DataTypes) => {
    var courseWiseLearnerPace = sequelize.define('muln_course_wise_daily_learner_pace', {
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
          aheadSchedule: {
              type: DataTypes.BIGINT(21)
          },
          behindSchedule: {
            type: DataTypes.BIGINT(21)
          },
          onTrack: {
            type: DataTypes.BIGINT(21)
          },
          haveNotStarted: {
            type: DataTypes.BIGINT(21),
            field: 'have_not_started'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return courseWiseLearnerPace;
  };