const handlerAuthReq = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Пароль или почта не могут быть пустыми' });
  }
}

module.exports = { handlerAuthReq };