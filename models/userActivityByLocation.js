module.exports = (sequelize, DataTypes) => {
  var userActivityByLocation = sequelize.define('muln_Current_User_Activity_By_Location', {
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
        locaitonId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        locationName: {
          type: DataTypes.STRING(30)
        },
        totalActiveUsers: {
          type: DataTypes.INTEGER
        },
        activeUsersSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        enrolledUsers: {
          type: DataTypes.INTEGER
        },
        enrolledUsersSinceLastMonth: {
          type: DataTypes.INTEGER,
          primaryKey: true
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
        tableName: 'muln_Current_User_Activity_By_Location'
      });
  return userActivityByLocation;
};