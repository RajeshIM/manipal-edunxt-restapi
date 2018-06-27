module.exports = (sequelize, DataTypes) => {
  var courseWiseLearningActivities = sequelize.define('muln_course_wise_learning_activities', {
        domainId: {
          type: DataTypes.STRING(100),
          field: 'domain_id'
        },
        LnDUserId: {
        	type: DataTypes.INTEGER,
        	primaryKey: true,
          field: 'user_id'
        },
        programId: {
          type: DataTypes.INTEGER,
          field: 'program_id'
        },
        courseId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'course_id'
        },
        userType: {
          type: DataTypes.STRING(3),
          field: 'user_type'
        },
        activeUsersSinceLastMonth: {
          type: DataTypes.BIGINT(21) 
        },
        enrolledUsers: {
          type: DataTypes.BIGINT(21) 
        },
        enrolledUsersSinceLastMonth: {
          type: DataTypes.BIGINT(21) 
        },
        userCompletedTraining: {
          type: DataTypes.BIGINT(21) 
        },
        usersCompletedTrainingSinceLastMonth: {
          type: DataTypes.BIGINT(21) 
        },
        behindSchedule: {
          type: DataTypes.BIGINT(21) 
        },
        aheadSchedule: {
          type: DataTypes.BIGINT(21) 
        },
        onTrack: {
          type: DataTypes.BIGINT(21) 
        },
        usersHaveNotStarted: {
          type: DataTypes.BIGINT(21) 
        },
        trainerRating: {
          type: DataTypes.DECIMAL(38,2)
        },
        trainerRatingBy: {
          type: DataTypes.DECIMAL(38,2)
        },
        currentLearnerSatisfaction: {
          type: DataTypes.DECIMAL(38,2)
        },
        learnerSatisfactionBy: {
          type: DataTypes.DECIMAL(38,2)
        },
        contentRating: {
          type: DataTypes.DECIMAL(38,2)
        },
        contentRatingBy: {
          type: DataTypes.DECIMAL(38,2)
        },
        loadDate: {
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
  // Orders.associate = function(models) {

  //   Orders.Persons = Orders.belongsTo(models.Persons, {as:'PersonsData', foreignKey: 'PersonID'});
  //   Orders.Users = Orders.belongsTo(models.User, {as:'userData', foreignKey: 'UserID'});
  // };
  return courseWiseLearningActivities;
};