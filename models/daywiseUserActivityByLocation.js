module.exports = (sequelize, DataTypes) => {
  var daywiseUserActivityByLocation = sequelize.define('muln_Day_Wise_User_Activity_By_Location', {
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
        Date: {
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
        tableName: 'muln_Day_Wise_User_Activity_By_Location'
      });
  return daywiseUserActivityByLocation;
};