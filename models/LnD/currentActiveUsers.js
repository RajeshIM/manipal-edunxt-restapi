module.exports = (sequelize, DataTypes) => {
  var currentActiveUsers = sequelize.define('muln_current_active_users', {
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
  
  return currentActiveUsers;
};