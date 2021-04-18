const producer = require('../workers/Producer');
const User = require('../model/User');

async function login(req) {
  const username = req.username;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  producer.sendToQueue('auth.service.ret', user ? user : null);
}

module.exports = {
  login
}