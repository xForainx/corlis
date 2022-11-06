const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DB,
    },
    listPerPage: 10,
  };
  module.exports = config;