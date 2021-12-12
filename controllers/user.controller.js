const db = require('../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = db.user;

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({
    where: {
      email,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'user not found',
        })
      }

      const hashed = crypto.createHash('sha1')
        .update(password)
        .digest('hex');
      const isValid = hashed === user.password;

      if (!isValid) {
        return res.status(403).json({
          status: false,
          message: 'wrong password',
        })
      }

      let payload = {
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_TOKEN);

      return res.status(200).json({
        status: true,
        message: 'logged in',
        token,
      })
    })
}

module.exports = {
  login,
};