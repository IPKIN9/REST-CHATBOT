const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const singleRes = require('../controllers/single_response');

router.get('/', checkAuth, singleRes.getAll);

router.post('/', checkAuth, singleRes.create);

router.get('/:_ID', checkAuth, singleRes.getById);

router.patch('/:_ID', checkAuth, singleRes.update);

router.delete('/:_ID', checkAuth, singleRes.delete);

module.exports = router;