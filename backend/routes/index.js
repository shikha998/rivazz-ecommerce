const express = require("express");
const router = express.Router();
const adminSignUpController = require("../controller/SingUp"); // <-- Correct path and case
const userSignInController = require("../controller/SingIn");
const {upload, uploadProduct } = require("../controller/uploadProduct");
router.post("/signup/admin", adminSignUpController); // <-- Use userSignUpController directly
 // <-- Use userSignUpController directly
router.post("/login", userSignInController); // <-- Use userSignUpController directly

router.post("/upload-product", upload.single("productImages"), uploadProduct);
module.exports = router;



// routes/index.js

// const express = require("express");
// const router = express.Router();
// const adminSignUpController = require("../controllers/adminSignUpController");
// const userSignInController = require("../controllers/userSignInController");
// const { upload, uploadProduct } = require("../controllers/productController");

// router.post("/signup/admin", adminSignUpController);
// router.post("/login", userSignInController);
// router.post("/upload-product", upload.single("productImages"), uploadProduct);

// module.exports = router;
