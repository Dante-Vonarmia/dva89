module.exports = {
  port: 3000,
  session: {
    cookieSecret: 'dva89',
    key: 'dva89',
    maxAge: 2592000000,
  },
  cookie: {
    maxAge: 2592000000,
    httpOnly: true,
    signed: true,
  },
  mongodb: {
    development: {
      connectionString: 'mongodb://localhost:27017/dva89',
    },
    production: {
      connectionString: 'mongodb://localhost:27017/dva89-test',
    },
  },
};
