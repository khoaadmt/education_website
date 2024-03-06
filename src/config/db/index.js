const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev");
    console.log("connect successfully !!!");
  } catch (error) {
    console.log("connect false !!!");
  }
}
module.exports = { connect };
// connect mongo atlas
// mongodb+srv://khoaadmt:7kzxm8Z8ubr0enPc@cluster0.ufyyg1h.mongodb.net/
// mongodb://127.0.0.1:27017/f8-education-dev
