module.exports = (sequelize, DataTypes) => {
  var organizationsInterests = sequelize.define('muln_organizations_interests', {
        LnDUserId: {
        	type: DataTypes.INTEGER
        },
        courseId: {
          type: DataTypes.INTEGER
        },
        courseName: {
          type: DataTypes.STRING(30)
        },
        zoneId: {
          type: DataTypes.INTEGER
        },
        zoneName: {
          type: DataTypes.STRING(30)
        },
        teamId: {
          type: DataTypes.INTEGER
        },
        teamName: {
          type: DataTypes.STRING(30)
        },
        hits: {
          type: DataTypes.INTEGER
        },
        hitsSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        noOfFollowers: {
          type: DataTypes.INTEGER
        },
        followersSinceLastMonth: {
          type: DataTypes.INTEGER
        },
        numberOfLikes : {
          type: DataTypes.STRING(50)
        },
        avgRating: {
          type: DataTypes.INTEGER
        },
        videoTags: {
          type: DataTypes.INTEGER
        },
        articalTags: {
          type: DataTypes.INTEGER
        },
        date: {
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
  return organizationsInterests;
};