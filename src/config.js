const config = {
  PORT: process.env.PORT || 3000,
  MYSQL: {
    database: process.env.MYSQL_DATABASE || 'hubman',
    user: process.env.MYSQL_USER || 'hubman',
    password: process.env.MYSQL_PASSWORD || '&kMu7FUlwUvmLdo3P*',
    options: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  }
}

module.exports = config;
