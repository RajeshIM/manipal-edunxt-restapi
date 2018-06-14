module.exports = (sequelize, DataTypes) => {
  var daywiseUserActivityByLocation = sequelize.define('muln_day_wise_user_activity_by_location', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
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
          type: DataTypes.INTEGER
        },
        Date: {
          type: DataTypes.DATE,
          primaryKey: true
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
      });
  return daywiseUserActivityByLocation;
};