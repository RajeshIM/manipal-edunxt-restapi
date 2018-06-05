var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var daywiseActiveUsers = sequelize.define('muln_daywise_active_users', {
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
        day: {
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
      },
      {
        tableName: 'muln_daywise_active_users'
      });
  // Orders.associate = function(models) {

  //   Orders.Persons = Orders.belongsTo(models.Persons, {as:'PersonsData', foreignKey: 'PersonID'});
  //   Orders.Users = Orders.belongsTo(models.User, {as:'userData', foreignKey: 'UserID'});
  // };
  return daywiseActiveUsers;
};