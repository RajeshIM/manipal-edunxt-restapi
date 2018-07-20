module.exports = (sequelize, DataTypes) => {
    var dailyActiveUsers = sequelize.define('muln_daily_active_users', {
          activeUsers: {
              type: DataTypes.DECIMAL(21,2),
              field: 'active_users_count'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date',
            primaryKey: true
          }
        });
    return dailyActiveUsers;
  };