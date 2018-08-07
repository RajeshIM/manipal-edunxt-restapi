module.exports = (sequelize, DataTypes) => {
    var trainerWiseOrganizationPerformance = sequelize.define('muln_daily_trainer_organization_performance', {
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
          courseName: {
            type: DataTypes.STRING(50),
            field: 'course_name'
          },
          programId: {
            type: DataTypes.INTEGER(11),
            field: 'program_id'
          },
          programName: {
            type: DataTypes.STRING(50),
            field: 'program_name'
          },
          trainerId: {
            type: DataTypes.INTEGER(11),
            field: 'trainer_id'
          },
          trainerName: {
            type: DataTypes.STRING(50),
            field: 'trainer_name'
          },
          trainingsConducted: {
            type: DataTypes.INTEGER,
            field: 'trainings_conducted',
            get: function() {
              return parseInt(this.getDataValue('trainingsConducted') || 0);
            }
          },
          peopleTrained: {
            type: DataTypes.INTEGER,
            field: 'people_trained',
            get: function() {
              return parseInt(this.getDataValue('peopleTrained') || 0);
            }
          },
          avgRating: {
            type: DataTypes.DECIMAL(9,2),
            field: 'avg_rating',
            get: function() {
              var val = parseFloat(this.getDataValue('avgRating') || 0);
              return parseFloat(val);
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return trainerWiseOrganizationPerformance;
  };