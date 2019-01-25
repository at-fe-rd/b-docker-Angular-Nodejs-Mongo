var mongoose = require('mongoose');
var User = require('../models/user');

exports.create = function(req, res, next) {
  let user = new User({
    name: req.body.name,
    age: req.body.age
  });

  user.save(error => {
    res.status(500).send('something when wrong')
    // if (error) res.status(500).send(error);
    // res.status(201).json({
    //   message: 'User created successfully'
    // });
  });
}

exports.index = function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);
    res.status(200).json(users);
  });
}
