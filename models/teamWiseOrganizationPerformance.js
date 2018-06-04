module.exports = (sequelize, DataTypes) => {
  var teamWiseOrganizationPerformance = sequelize.define('muln_team_wise_organization_performance', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        zoneId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        teamId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        teamName: {
          type: DataTypes.STRING(30)
        },
        completion: {
          type: DataTypes.INTEGER
        },
        completedPrograms: {
          type: DataTypes.INTEGER
        },
        teamsize: {
          type: DataTypes.INTEGER
        },
        actionMessage: {
          type: DataTypes.STRING(20)
        },
        date: {
          type: DataTypes.DATE
        },
        jobId: {
          type: DataTypes.INTEGER
        },
        createdBy: {
          type: DataTypes.STRING(30)
        },
        createdOn: {
          type: DataTypes.DATE
        },
        modifiedBy: {
          type: DataTypes.STRING(30)
        },
        modifiedOn: {
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'muln_team_wise_organization_performance'
      });
  return teamWiseOrganizationPerformance;
};