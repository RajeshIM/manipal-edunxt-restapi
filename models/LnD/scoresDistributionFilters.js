module.exports = (sequelize, DataTypes) => {
    var scoresDistributionFilters = sequelize.define('muln_im_course_wise_scores', {
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
            type: DataTypes.STRING(255),
            field: 'module_name'
          }
        });
    return scoresDistributionFilters;
  };