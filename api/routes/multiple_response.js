const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({message: 'multiple'});
});

router.post('/', (req, res, next)=>{
});

router.get('/:_ID', (req, res, next)=>{
});

router.patch('/:_ID', (req, res, next)=>{
});

router.delete('/:_ID', (req, res, next)=>{
});

module.exports = router;