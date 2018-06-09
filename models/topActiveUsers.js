module.exports = (sequelize, DataTypes) => {
  var topActiveUsers = sequelize.define('muln_top_active_users', {
        personId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        fileLocation: {
          type: DataTypes.STRING(1000)
        },
        fileId: {
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
        tableName: 'muln_top_active_users'
      });
  // Orders.associate = function(models) {

  //   Orders.Persons = Orders.belongsTo(models.Persons, {as:'PersonsData', foreignKey: 'PersonID'});
  //   Orders.Users = Orders.belongsTo(models.User, {as:'userData', foreignKey: 'UserID'});
  // };
  return topActiveUsers;
};