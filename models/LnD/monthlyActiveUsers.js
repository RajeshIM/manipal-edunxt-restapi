module.exports = (sequelize, DataTypes) => {
    var monthlyActiveUsers = sequelize.define('muln_monthly_active_users', {
          montlyActiveUsers: {
              type: DataTypes.DECIMAL(21,0),
              field: 'monthly_active_users_count'
          },
          date: {
            type: DataTypes.STRING(69),
            field: 'load_date',
            primaryKey: true
          }
        });
    return monthlyActiveUsers;
  };