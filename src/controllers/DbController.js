const producer = require('../workers/Producer');
const { v4: uuidv4 } = require('uuid');
const User = require('../model/User');

async function login(req) {
  const username = req.username;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  producer.sendToQueue('auth.service', user ? user : null);
}

async function signup(req) {
  const userDb = await User.findOne({
    where: {
      username: req.username
    }
  });
  if (userDb) {
    producer.sendToQueue('auth.service', { action: 'error', message: 'User already exists' });
    console.error('User already exists')
  } else {
    const newUser = {
      id: uuidv4(),
      username: req.username,
      password: req.password,
    }
    const user = await User.create(newUser);

    producer.sendToQueue('auth.service', { user, action: 'signup' });
  }
}

module.exports = {
  login,
  signup
}