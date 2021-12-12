'use strict';
const crypto = require('crypto');
const { env } = process;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: crypto.randomBytes(10).toString('hex'),
      email: env.ADMIN_EMAIL,
      password: crypto.createHash('sha1')
        .update(env.ADMIN_PASSWORD)
        .digest('hex'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
   }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users');
  }
};
