const queueActions = require('../util/QueueActions');

const DbController = require('../controllers/DbController');

queueActions.consume('relational.db.service', async message => {
  const login = JSON.parse(message.content);
  console.log('Login: ', login.username);

  DbController.login(login);
});