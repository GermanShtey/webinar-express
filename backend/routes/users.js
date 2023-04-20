const router = require('express').Router();
const { getUsers, getProfile, createProfile} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.use('/users', auth);
router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/users', createProfile);

module.exports = router;
