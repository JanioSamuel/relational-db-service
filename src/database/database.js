const Sequelize = require('sequelize');
const sequelize = new Sequelize('chat', 'root', 'admin', { dialect: 'postgres', host: 'localhost' });

module.exports = sequelize;