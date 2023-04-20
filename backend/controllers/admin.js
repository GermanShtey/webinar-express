const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const { handlerAuthReq } = require('../utils/handlerAuthReq');
const { generateJWT } = require('../utils/generateJWT');

const SALT_ROUNDS = 10;

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  handlerAuthReq(req, res);

  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const error = new Error('Такой пользователь уже существует');
      error.statusCode = 403;
      throw error;
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newAdmin = await Admin.create({ email, password: hash });
    res.status(200).send(`Пользователь с email ${newAdmin.id} успешно зарегистрирован!`);
  } catch (error) {
    if (error.statusCode === 403) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
};

const authAdmin = async (req, res) => {
  const { email, password } = req.body;
  handlerAuthReq(req, res);

  return Admin.findOne({ email })
    .then((admin) => {
      if (!admin) {
        res.status(400).send({ message: 'Неверный email или пароль' });
        return;
      }

      bcrypt.compare(password, admin.password)
        .then((isEqual) => {
          if (!isEqual) {
            return res.status(401).send({ message: 'Неверный email или пароль' });
          }

          const token = generateJWT(admin.id);
          res.status(200).send({ token });
        })
    }).catch((error) => {
      res.status(400).send(error.message);
    })
};

module.exports = {
  registerAdmin,
  authAdmin,
};
