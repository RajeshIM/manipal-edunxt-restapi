module.exports = (sequelize, DataTypes) => {
  var coursesDropDown = sequelize.define('muln_im_lnduser_course', {
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        courseName: {
          type: DataTypes.STRING(30)
        },
        batchId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        batchName: {
          type: DataTypes.STRING(30)
        },
        teamId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        teamName: {
          type: DataTypes.STRING(30)
        },
        zoneId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        zoneName: {
          type: DataTypes.STRING(30)
        },
        domainId: {
          type: DataTypes.STRING(100),
          primaryKey: true
        },
        courseStartDate: {
          type: DataTypes.DATE
        },
        courseEndDate: {
          type: DataTypes.DATE
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
  return coursesDropDown;
};