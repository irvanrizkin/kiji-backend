module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('users', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
  });
  return user;
};