const REG_URL = /(http:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)|(https:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)/;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
module.exports = {
  REG_URL,
  DB_URL,
};
