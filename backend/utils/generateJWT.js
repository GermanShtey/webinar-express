const jwt = require('jsonwebtoken');
const SECRET = 'veryhiddensecretfullofsecrets';

const generateJWT = (id) => {
  return jwt.sign({ id }, SECRET);
}

module.exports = { generateJWT };
