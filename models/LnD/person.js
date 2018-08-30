module.exports = (sequelize, DataTypes) => {
    var person = sequelize.define('muln_person', {
          personId: {
            type: DataTypes.INTEGER(11),
            field: 'personid',
            primaryKey: true
          },
          email: {
            type: DataTypes.STRING(100),
            field: 'primaryemail'
          }
        });
    return person;
  };