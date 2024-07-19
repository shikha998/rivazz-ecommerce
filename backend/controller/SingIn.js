const userModel = require("../model/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: "foobar",
        },
        "secret"
      );
      throw new Error("Please provide password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    console.log("useruser", user);
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPasswordcheckPassword", checkPassword);
    if (checkPassword) {
      const tokenData = {
        _id: user.id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 12,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.status(200).json({
        message: "Login Successfully",
        data: { tokenData, token },
        success: true,
        error: false,
      });
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
