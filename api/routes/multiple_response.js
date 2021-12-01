const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth'); 
const multiRes = require('../controllers/multiple_response');

router.get('/', checkAuth, multiRes.getAll);

router.post('/', checkAuth, multiRes.create);

router.get('/:_ID', checkAuth, multiRes.getById);

router.patch('/:_ID', checkAuth, multiRes.update);

router.delete('/:_ID', checkAuth, multiRes.delete);

module.exports = router;