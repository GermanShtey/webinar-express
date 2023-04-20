const jwt = require('jsonwebtoken');
const SECRET = 'veryhiddensecretfullofsecrets';

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const error = new Error('Необходима авторизация');
      error.statusCode = 403
      throw error;
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = await jwt.verify(token, SECRET);
    } catch (err) {
      const error = new Error('Необходима авторизация');
      error.statusCode = 403
      throw error;
    }

    req.user = payload;
    next();
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
};

module.exports = { auth };
