// Requilize for database data and dotenv to encrypt env inputs //
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Use JAWSDB to host MySQL database conencting to Sequelize for Heroku //
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
