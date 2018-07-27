module.exports = (sequelize, DataTypes) => {
    var allCoursesScores = sequelize.define('muln_all_courses_scores', {
          userId: {
            type: DataTypes.INTEGER(11),
            field: 'user_id',
            primaryKey: true
          },
          userType: {
            type: DataTypes.STRING(3),
            field: 'user_type'
          },
          batchId: {
            type: DataTypes.INTEGER(11),
            field: 'batch_id'
          },
          batchName: {
            type: DataTypes.STRING(255),
            field: 'batch_name'
          },
          questionPaperId: {
            type: DataTypes.INTEGER(11),
            field: 'questionpapertype_id'
          },
          filterName: {
            type: DataTypes.STRING(50),
            field: 'module_name'
          },
          date: {
            type: DataTypes.DATEONLY,
            field: 'load_date'
          },
          personId: {
            type: DataTypes.INTEGER(11),
            field: 'person_id'
          },
          learnerName: {
            type: DataTypes.STRING(50),
            field: 'learner_name'
          },
          serialNumber: {
            type: DataTypes.STRING(50),
            field: 'serial_no'
          },
          team :{
            type:DataTypes.STRING(50),
            field: 'team_name'
          },
          noOfAttempts: {
            type: DataTypes.DECIMAL(32,0),
            field: 'no_of_attempts',
            get: function() {
              return Math.round(this.getDataValue('noOfAttempts') || 0);
            }
          },
          Progress: {
            type: DataTypes.DECIMAL(13,2),
            field: 'progress',
            get: function() {
              return Math.round(this.getDataValue('Progress') || 0);
            }
          },
          scoreAvg: {
            type: DataTypes.DECIMAL(35,0),
            field: 'scores_avg',
            get: function() {
              return Math.round(this.getDataValue('scoreAvg') || 0);
            }
          }
        });
    return allCoursesScores;
  };