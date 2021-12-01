const express = require('express');
const mongoose = require('mongoose');

const multiple_res = require('../models/multiple_res');
const multipleDetail_res = require('../models/multipleDetail_res');

const baseUrl = "http://localhost:"+ process.env.SERVER_PORT;

exports.getAll = (req, res, next)=>{
    multipleDetail_res.find()
    .populate('multipleRes', 'content')
    .exec()
    .then(result => {
        const length = result.length;
        if(length >= 1){
            res.status(200).json({
                dataCount: length,
                multiple_detail: result.map(doc => {
                    return {
                        _id: doc._id,
                        multipleRes: doc.multipleRes,
                        content: doc.content,
                        continueContent: doc.continueContent
                    }
                }),
                request:{
                    method: "POST",
                    url: baseUrl + '/multiple_res',
                    body:{
                        multiRes: "Mongo objectID",
                        content: "String",
                        continueContent: "Mongo objectID"
                    }
                }
            });
        } else {
            res.status(404).json({message: "This table empty data"});
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
        console.log(err);
    })
};

exports.create = (req, res, next)=>{
    const data = {
        _id: new mongoose.Types.ObjectId(),
        multipleRes: req.body.multipleRes,
        content: req.body.content,
        continueContent: req.body.continueContent
    }
    multiple_res.findById(data.multipleRes).then(result => {
        if(!result){
            res.status(404).json({
                message: 'multipleRes data not found'
            });
        } else {
            const multipleDetail = new multipleDetail_res(data);
            multipleDetail.save()
            .then(success => {
                res.status(201).json({
                    message: 'Multiple detail respons created',
                    data: {
                        _id: success._id,
                        multipleRes: success.multipleRes,
                        content: success.content,
                        continueContent: success.continueContent,
                        request: {
                            method: 'get',
                            url:baseUrl + '/multiple_res/' + result._id
                        }
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Error data not saved',
                    error: err
                });
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error',
            error: err
        });
    })
};

exports.getById = (req, res, next)=>{
    const ID = req.params._ID;
    multipleDetail_res.findById(ID)
    .populate('multipleRes', 'content')
    .exec()
    .then(result => {
        if (result){
            res.status(200).json({
                _id: result.id,
                multipleRes: result.multipleRes,
                content: result.content,
                continueContent: result.continueContent,
                request:{
                    method: "POST",
                    url: baseUrl + '/multiple_detail/',
                    body:{
                        content: "String",
                        multipleRes: "Mongo_ID",
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
    .catch(
        err => {
            res.status(500).json({
                error: err.message
            });
            console.log(err);
        }
    )
};

exports.update = (req, res, next)=>{
    const ID = req.params._ID;
    const data = {
        multipleRes: req.body.multipleRes,
        content: req.body.content,
        continueContent: req.body.continueContent
    }
    multipleDetail_res.where({_id:ID}).update(data)
    .then(
        res.status(200).json({
            message: 'Data updated',
            request:{
                method: 'get',
                url:baseUrl + '/multiple_detail/' + ID
            }
        })
    )
    .catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    )
};

exports.delete = (req, res, next)=>{
    const ID = req.params._ID;
    multipleDetail_res.remove({_id:ID})
    .exec()
    .then(result => {
        if (result.deletedCount >= 1){
            res.status(200).json({
                message: 'Data deleted',
                deletedCount: result.deletedCount,
                request: {
                    type: 'POST',
                    url:baseUrl + '/multiple_detail/',
                    body: {
                        multipleRes: 'Mongo_ID',
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
};