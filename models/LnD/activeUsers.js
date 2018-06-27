module.exports = (sequelize, DataTypes) => {
  var activeUsers = sequelize.define('muln_activeusers', {
        personId: {
        	type: DataTypes.INTEGER,
        	field: 'person_id'
        },
        fileLocation: {
          type: DataTypes.STRING(510)
        },
        login_time: {
          type: DataTypes.DATE
        }
      });
  return activeUsers;
};