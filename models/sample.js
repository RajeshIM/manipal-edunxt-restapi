var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var sample = sequelize.define('sample', {
        id: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        date: {
          type: DataTypes.DATE,
          primaryKey: true,
          get: function() {
            //return moment.utc(this.getDataValue('date')).toDate();
            return moment(this.getDataValue('date')).format('YYYY-MM-DD HH:mm:ss');
            //return (new Date(this.getDataValue('date')+"UTC"));
          }
        },
        name: {
          type: DataTypes.STRING(30)
        }
      },
      {
        tableName: 'sample'
      });
  return sample;
};