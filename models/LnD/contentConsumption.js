module.exports = (sequelize, DataTypes) => {
    var contentConsumption = sequelize.define('muln_content_consumption', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          courseId: {
            type: DataTypes.INTEGER(11),
            field: 'course_id'
          },
          programId: {
            type: DataTypes.INTEGER(11),
            field: 'program_id'
          },
          courseName: {
            type: DataTypes.STRING(50),
            field: 'course_name'
          },
          contentId: {
            type: DataTypes.INTEGER(11),
            field: 'course_id'
          },
          contentName: {
            type: DataTypes.STRING(50),
            field: 'content_name'
          },
          contentType: {
            type: DataTypes.STRING(50),
            field: 'content_type'
          },
          author: {
            type: DataTypes.STRING(50)
          },
          views: {
            type: DataTypes.DECIMAL(9,2),
            get: function() {
              return Math.round(this.getDataValue('views') || 0);
            }
          },
          avgRating: {
            type: DataTypes.DECIMAL(9,2),
            field: 'avg_rating',
            get: function() {
              var val = parseFloat(this.getDataValue('avgRating') || 0).toFixed(1);
              return parseFloat(val);
            }
          },
          duration: {
            type: DataTypes.DECIMAL(9,2),
            get: function() {
              return Math.round(this.getDataValue('duration') || 0);
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          }
        });
    return contentConsumption;
  };