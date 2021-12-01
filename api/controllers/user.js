const express = require('express');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = (req, res, next)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            res.status(409).json({message: "Username is exists"});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err) {
                    return res.status(500).json({error: err});
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "User created",
                            data: result
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: err
                        });
                    })
                }
            });
        }
    })
};

exports.login = (req, res, next)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({message: 'Auth failed, User not found`'});;
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err){
                return res.status(401).json({message: 'Auth failed'});;
            }
            if (result){
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_KEY, {
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    message: 'Auth success',
                    token: token
                });
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
};

exports.delete = (req, res, next)=>{
    User.deleteOne({_id:req.params._ID})
    .exec()
    .then(result => {
        if(result.deletedCount >=1){
            res.status(200).json({
                message:"User deleted",
                deletedCount: result.deletedCount
            });
        } else {
            res.status(404).json({
                message:"Nothing deleted, ID not found",
                deletedCount: result.deletedCount
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message:err
        });
    })
};