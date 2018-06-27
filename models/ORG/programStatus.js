module.exports = (sequelize, DataTypes) => {
  var programStatus = sequelize.define('muln_program_status', {
        orgHeadId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        inProgressCount: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        hoursSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        behindScheduleCount: {
          type: DataTypes.INTEGER
        },
        programsSinceLastMonth: {
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
      });
  return programStatus;
};