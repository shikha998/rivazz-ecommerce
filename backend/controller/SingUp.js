const adminModel = require("../model/AdminModel");
const bcrypt = require("bcrypt");

async function adminSignUpController(req, res) {
  console.log("reqreq", req);
  try {
    const { name, email, password } = req.body;

    const user = await adminModel.findOne({ email });
    if (user) {
      throw new Error("This user already exists ");
    }
    if (!name) {
      throw new Error("Please provide name ");
    }
    if (!email) {
      throw new Error("Please provide email ");
    }
    if (!password) {
      throw new Error("Please provide password ");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("Failed to hash password");
    }
    const userData = new adminModel({
      name,
      email,
      role: "GENERAL",
      password: hashPassword,
    });

    const savedUser = await userData.save();
    console.log("savedUsersavedUser", savedUser);
    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = adminSignUpController;
