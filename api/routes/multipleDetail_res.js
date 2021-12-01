const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const multipleDetail = require('../controllers/multipleDetail_res');

router.get('/', checkAuth, multipleDetail.getAll);

router.post('/', checkAuth, multipleDetail.create);

router.get('/:_ID', checkAuth, multipleDetail.getById);

router.patch('/:_ID', checkAuth, multipleDetail.update);

router.delete('/:_ID', checkAuth, multipleDetail.delete);

module.exports = router;