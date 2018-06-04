module.exports = (sequelize, DataTypes) => {
  var contentConsumption = sequelize.define('content_consumption', {
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
        contentId: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        contentName: {
          type: DataTypes.STRING(30)
        },
        contentType: {
          type: DataTypes.STRING(30)
        },
        author: {
          type: DataTypes.STRING(30)
        },
        views: {
          type: DataTypes.INTEGER
        },
        avgRating: {
          type: DataTypes.DOUBLE
        },
        duration: {
          type: DataTypes.INTEGER
        },
        date: {
          type: DataTypes.DATE,
          primaryKey: true
        },
        jobId: {
          type: DataTypes.STRING(30)
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
        tableName: 'content_consumption'
      });
  return contentConsumption;
};