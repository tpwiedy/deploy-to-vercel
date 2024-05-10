require('dotenv').config()
module.exports = {
  "development": {
    "username": "tpwiedy",
    "password": "5gMrSa4Fzz33PNF9DzAjjw",
    "database": "bingle-shop",
    "host": "bingleshop-test-db-6759.6xw.aws-ap-southeast-1.cockroachlabs.cloud",
    "port":"26257",
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + '/root.crt').toString(),
      }
    }
  },
  "test": {
    "username": "postgres",
    "password": "SuperAdmin",
    "database": "binar_platinum_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    logging: false,
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
