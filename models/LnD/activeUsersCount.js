module.exports = (sequelize, DataTypes) => {
    var activeUsersCount = sequelize.define('muln_last_thirtyminutes_activeusers_count', {
          activeUsers: {
              type: DataTypes.BIGINT(11),
              field: 'activeusers_count',
              primaryKey: true
          }
        });
    return activeUsersCount;
  };