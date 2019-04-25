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
  },
  passwordLength: 6,
  token: {
    expireTime: process.env.TOKEN.EXPIRE_TIME || 60*60*24, // 24 hours
    secret: process.env.TOKEN.JWT_SECRET || '10E57825F89949BD99BF7714C02064C8431A28E322A17CC15E3B07C791AFFE78', // taken from https://www.grc.com/passwords.htm
    saltingRounds: 12,
  }
}

module.exports = config;
