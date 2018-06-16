var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var hourwiseActiveUsers = sequelize.define('muln_Hour_Wise_Active_Users', {
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
        totalActiveUsers: {
          type: DataTypes.INTEGER
        },
        activeLearners: {
          type: DataTypes.INTEGER
        },
        activeFacultiesAndAdmins: {
          type: DataTypes.INTEGER
        },
        onlineDelivery: {
          type: DataTypes.INTEGER
        },
        offlineDelivery: {
          type: DataTypes.INTEGER
        },
        hour: {
          type: DataTypes.DATE,
          primaryKey: true
        },
        jobId: {
          type: DataTypes.STRING(30)
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

  return hourwiseActiveUsers;
};