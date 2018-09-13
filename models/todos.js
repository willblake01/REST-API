module.exports = function (sequelize, DataTypes) {
  var Todos = sequelize.define('Todos', {
    title: DataTypes.STRING,
    inProgress: DataTypes.BOOLEAN
  });
  return Todos;
};
