module.exports = (sequelize, DataTypes) => {
    var teamWiseOrganizationPerformance = sequelize.define('muln_daily_team_organization_performance', {
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
          teamId: {
            type: DataTypes.INTEGER(11),
            field: 'team_id'
          },
          teamName: {
            type: DataTypes.STRING(50),
            field: 'team_name'
          },
          teamSize: {
            type: DataTypes.INTEGER,
            field: 'team_size',
            get: function() {
              return parseInt(this.getDataValue('teamSize') || 0);
            }
          },
          completedProgram: {
            type: DataTypes.INTEGER,
            field: 'completed_program',
            get: function() {
              return parseInt(this.getDataValue('completedProgram') || 0);
            }
          },
          completion: {
            type: DataTypes.DECIMAL(9,2),
            field: 'completion_percentage',
            get: function() {
              var val = parseFloat(this.getDataValue('completion') || 0);
              return parseFloat(val).toFixed(0);
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return teamWiseOrganizationPerformance;
  };