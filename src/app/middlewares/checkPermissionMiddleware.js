const jwt = require("jwt");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const User = require("../models/User");
module.exports = async function checkPermissionMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "bạn chưa đăng nhập",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "token lỗi",
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "bạn không có quyền truy cập",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
