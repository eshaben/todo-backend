require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      client: 'pg',
      connection: 'postgres://localhost/todo-db'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
