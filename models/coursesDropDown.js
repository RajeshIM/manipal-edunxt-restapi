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
        courseInstanceId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        domainId: {
          type: DataTypes.STRING(100),
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
        tableName: 'muln_im_lnduser_course'
      });
  return coursesDropDown;
};