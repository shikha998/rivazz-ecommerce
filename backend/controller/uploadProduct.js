const Product = require("../model/ProductModel");
const multer = require("multer");

// Multer storage configuration
const storageEngine = multer.diskStorage({
  destination: "./uploads", // Directory where uploaded images will be stored
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

// File filter function (example, adjust as needed)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

// Multer instance
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 }, // Limit file size if needed
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); // Validate file type
  },
});

// Upload product controller
async function uploadProduct(req, res, next) {
  try {
    const {
      productName,
      brandName,
      description,
      price,
      sellingPrice,
    } = req.body;

    let image = req.file
      ? `http://localhost:8001/uploads/${req.file.filename}`
      : undefined;

    const productData = {
      productName,
      brandName,
      image,
      description,
      price,
      sellingPrice,
    };

    const product = new Product(productData);
    const result = await product.save();

    res.status(200).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = { upload, uploadProduct };
