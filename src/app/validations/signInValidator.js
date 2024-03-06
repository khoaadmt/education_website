const joi = require("joi");

const signIn = joi.object({
  username: joi
    .string()
    .required()
    .email()
    .regex(/\.com$/)
    .messages({
      "string.empty": "Email không được để trống",
      "string.email": "Email không đúng định dạng",
      "string.pattern.base": "Email không đúng định dạng",
    }),
  password: joi.string().required().min(4).max(255).message({
    "string.empty": "password không được để trống",
    "string.required": "password là bắt buộc",
    "string.min": "password phải có ít nhất {#litmit} ký tự",
    "string.max": "password phải có ít hơn {#litmit} ký tự",
  }),
  role: joi.string(),
});
module.exports = signIn;
