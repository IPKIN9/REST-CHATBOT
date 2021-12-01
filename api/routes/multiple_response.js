const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multiple_res = require('../models/multiple_res');

const checkAuth = require('../middleware/checkAuth'); 

const baseUrl = "http://localhost:"+ process.env.SERVER_PORT;

router.get('/', checkAuth, (req, res, next)=>{
    multiple_res.find()
    .exec()
    .then(result => {
        const length = result.length;
        if (length >= 1){
            res.status(200).json({
                dataCount: length,
                data:result.map(doc => {
                    return {
                        _id: doc._id,
                        content: doc.content
                    }
                }),
                request:{
                    method: "POST",
                    url: baseUrl + '/multiple_res/',
                    body:{
                        content: "String"
                    }
                }
            });
        } else {
            res.status(404).json({message: "This table empty data"});
        }
    })
    .catch(err => {
        res.status(500).json({
            message:err
        });
        console.log(err);
    })
});

router.post('/', checkAuth, (req, res, next)=>{
    const data = {
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content

    }
    const multiple = new multiple_res(data);
    multiple.save()
    .then(result => {
        res.status(201).json({
            message: 'Created multiple res data',
            data:{
                _id: result._id,
                content: result.content,
                request: {
                    method: 'get',
                    url:baseUrl + '/multiple_res/' + result._id
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
        console.log(err);
    })
});

router.get('/:_ID', checkAuth, (req, res, next)=>{
    const ID = req.params._ID;
    multiple_res.findById(ID)
    .exec()
    .then(result => {
        if (result) {
            res.status(200).json({
                _id: result._id,
                content: result.content,
                request:{
                    method: "POST",
                    url: baseUrl + '/multiple_res/',
                    body:{
                        content: "String",
                        continueContent: "mongo_ID"
                    }
                }
            });
        } else {
            res.status(404).json({
                error: "Data not found"
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        });
        console.log(err);
    })
});

router.patch('/:_ID', checkAuth, (req, res, next)=>{
    const ID = req.params._ID;
    const data = {
        content: req.body.content,
        continueContent: req.body.continueContent
    }
    multiple_res.where({_id:ID}).update(data)
    .then(
        res.status(200).json({
            message: 'Data updated',
            request:{
                method: 'get',
                url:baseUrl + '/multiple_res/' + ID
            }
        })
    )
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

router.delete('/:_ID', checkAuth, (req, res, next)=>{
    const ID = req.params._ID;
    multiple_res.remove({_id:ID})
    .exec()
    .then(result => {
        if (result.deletedCount >= 1){
            res.status(200).json({
                message: 'Data deleted',
                deletedCount: result.deletedCount,
                request: {
                    type: 'POST',
                    url:baseUrl + '/multiple_res/',
                    body: {
                        content: 'String',
                        continueContent: "Mongo_ID"
                    },
                    description: 'Create new data'
                }
            });
        } else {
            res.status(404).json({
                message: 'Nothing deleted, Id not found',
                deletedCount: result.deletedCount
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:err});
    })
});

module.exports = router;