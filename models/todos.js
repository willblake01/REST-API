module.exports = function (sequelize, DataTypes) {
  var Todos = sequelize.define('Todos', {
    title: DataTypes.STRING,
    status: DataTypes.STRING
  });
  return Todos;
};
