module.exports = (sequelize, DataTypes) => {
  var activeUsers = sequelize.define('muln_current_active_users', {
        personId: {
        	type: DataTypes.INTEGER(11),
          field: 'person_id',
          primaryKey: true
        },
        fileLocation: {
          type: DataTypes.STRING(510)
        },
        date: {
          type: DataTypes.DATE,
          field:'login_time'
        }
      });
  return activeUsers;
};