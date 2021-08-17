const Joi = require("joi");

exports.registrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().min(10).required(),
  lastName: Joi.string().min(2).required(),
  firstName: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

exports.login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

exports.recover = Joi.object().keys({
  email: Joi.string().email().required()
});

exports.resetPassword = Joi.object().keys({
  password: Joi.string().min(8),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  resetToken: Joi.string().required()
});

exports.hairStyle = Joi.object().keys({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  category: Joi.string().min(2).required(),
  price: Joi.number().required(),
  time: Joi.string().min(2).required(),
  createdBy:  Joi.string().min(2).required(),
});

exports.appointment = Joi.object().keys({
    user: Joi.string().min(2).required(),
    date: Joi.string().min(2).required(),
    time: Joi.string().min(2).required()
  });
  