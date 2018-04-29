var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var logger = require("../logger");
var Form = require('../models/form');

var formRouter = express.Router();

formRouter.use(bodyParser.json());


formRouter.route('/getAllForms')

    .get(function (req, res, next) {
        Form.find({}, function (err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        })
    });

formRouter.route('/createForm')

    .post(function(req, res, next) {
        Form.create(req.body, function(err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            logger.debug("Form created Successfully - : \n" +result);
            User.findOne({uid: req.body.createdBy.uid}, function(err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                var formData = {
                    formNumber: req.body.formNumber,
                    name: req.body.name,
                    description: req.body.description,
                    elements: req.body.elements
                };

                if(user.forms){
                    user.forms.push(formData);
                } else {
                    user.forms = [];
                    user.forms.push(formData);
                }
                user.save(function (err, updatedUser) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send({
                        userInfo: updatedUser,
                        userdata: result
                    });
                })
            })
        });
    });



formRouter.route('/editForm/:formNumber')
    .put(function(req, res, next) {
        Form.findOneAndUpdate({formNumber: req.body.formNumber}, {$set: req.body}, function (err, result) {
            if (err) {
                logger.error(err);
                return res.status(500).send(err);
            }

            var formData = {
                formNumber: req.body.formNumber,
                name: req.body.name,
                description: req.body.description,
                elements: req.body.elements
            };

            if (req.body.createdBy == null || undefined) {
                var error = "Userdata not correct for requested person";
                return res.status(500).send(error);
            }
            User.update({uid: req.body.createdBy.uid}, {$pull: {forms: {formNumber: req.body.formNumber}}}, function (err, modified) {
                if (err) {
                    logger.error(err);
                    return res.status(500).send(err);
                }
                User.findOne({uid: req.body.createdBy.uid}, function (err, user) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (!user) {
                        return res.status(500).send({
                            message: 'No user found'
                        });
                    }

                    console.log(user);
                    if (user.forms) {
                        user.forms.push(formData);
                    } else {
                        user.forms = [];
                        user.forms.push(formData);
                    }
                    user.save(function (err, updatedUser) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        return res.status(200).send({
                            userInfo: updatedUser
                        });
                    })
                })
            })
        });
    });



formRouter.route('/getForm/:formNumber')

    .get(function(req, res, next) {
        Form.findOne({formNumber: req.params.formNumber}, function(err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        })
    });



module.exports = formRouter;