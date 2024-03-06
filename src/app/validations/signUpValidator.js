const joi = require("joi");

const signUp = joi.object({
  username: joi.string().empty().min(4).max(255).messages({
    "string.empty": "Tên người dùng không được để trống",
    "string.min": "Tên người dùng phải có ít nhất {#limit} ký tự",
    "string.max": "Tên người dùng phải có ít hơn {#limit} ký tự",
  }),

  email: joi
    .string()
    .required()
    .email()
    .regex(/\.com$/)
    .messages({
      "string.empty": "Email không được để trống",
      "string.email": "Email không đúng định dạng",
      "string.pattern.base": "Email không đúng định dạng",
    }),
  password: joi.string().empty().min(4).max(255).messages({
    "string.empty": "password không được để trống",
    "string.min": "password phải có ít nhất {#litmit} ký tự",
    "string.max": "password phải có ít hơn {#litmit} ký tự",
  }),
  confirmPassword: joi.ref("password"),
});
module.exports = signUp;
