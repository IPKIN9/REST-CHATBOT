const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const singleRes = require('../models/single_response');

const baseUrl = "http://localhost:"+ process.env.SERVER_PORT;

router.get('/', (req, res, next)=>{
    singleRes.find()
    .exec()
    .then(result => {
        const length = result.length;
        if (length >= 1){
            res.status(200).json({
                dataCount: length,
                data:result.map(doc => {
                    return {
                        _id: doc._id,
                        content: doc.content,
                        continueContent: doc.continueContent
                    }
                }),
                request:{
                    method: "POST",
                    url: baseUrl + '/single_res/',
                    body:{
                        content: "String",
                        continueContent: "monogo_ID"
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

router.post('/', (req, res, next)=>{
    const data = {
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content,
        continueContent: req.body.continueContent
    };
    const single_res = new singleRes(data);
    single_res.save()
    .then(result => {
        res.status(201).json({
            message: 'Created single res data',
            data: {
                _id: result._id,
                content: result.content,
                continueContent: result.continueContent,
                request:{
                    method: 'get',
                    url:baseUrl + '/single_res/' + result._id
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

router.get('/:_ID', (req, res, next)=>{
    const ID = req.params._ID;
    singleRes.findById(ID)
    .exec()
    .then(result => {
        if (result) {
            res.status(200).json({
                _id: result._id,
                content: result.content,
                continueContent: result.continueContent,
                request:{
                    method: "POST",
                    url: baseUrl + '/single_res/',
                    body:{
                        content: "String",
                        continueContent: "monogo_ID"
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

router.patch('/:_ID', (req, res, next)=>{
    const ID = req.params._ID;
    const data = {
        content: req.body.content,
        continueContent: req.body.continueContent
    }
    singleRes.where({_id:ID}).update(data)
    .then(
        res.status(200).json({
            message: 'Data updated',
            request:{
                method: 'get',
                url:baseUrl + '/single_res/' + ID
            }
        })
    )
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

router.delete('/:_ID', (req, res, next)=>{
    const ID = req.params._ID;
    singleRes.remove({_id:ID})
    .exec()
    .then(result => {
        if (result.deletedCount >= 1){
            res.status(200).json({
                message: 'Data deleted',
                deletedCount: result.deletedCount,
                request: {
                    type: 'POST',
                    url:baseUrl + '/single_res/',
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